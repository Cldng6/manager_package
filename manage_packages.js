const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const dangerousPackages = ['Paquet1', 'Paquet2', 'Paquet3']; // Remplacez par les noms des paquets dangereux

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour lister les programmes installés
function listInstalledPackages() {
    return new Promise((resolve, reject) => {
        exec('wmic product get name,version', (error, stdout) => {
            if (error) {
                return reject(error);
            }

            const lines = stdout.split('\n').filter(line => line.trim() !== '');
            const packages = lines.slice(1).map(line => {
                const parts = line.trim().split(/\s+/);
                return { name: parts.slice(0, -1).join(' '), version: parts[parts.length - 1] };
            });

            resolve(packages);
        });
    });
}

// Fonction pour sauvegarder les paquets en JSON
function savePackagesToJSON(packages) {
    const jsonData = JSON.stringify(packages, null, 2);
    fs.writeFileSync('installed_packages.json', jsonData, 'utf8');
    console.log('Liste des programmes sauvegardée dans installed_packages.json');
}

// Fonction pour supprimer un paquet
function uninstallPackage(packageName) {
    return new Promise((resolve, reject) => {
        exec(`wmic product where "name='${packageName}'" call uninstall /nointeractive`, (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}

// Demander à l'utilisateur d'entrer un paquet à supprimer
async function main() {
    try {
        const packages = await listInstalledPackages();
        savePackagesToJSON(packages); // Sauvegarder les paquets en JSON

        const dangerousList = packages.filter(pkg => dangerousPackages.includes(pkg.name));
        const safeList = packages.filter(pkg => !dangerousPackages.includes(pkg.name));

        console.log('Liste des programmes installés :\n');
        packages.forEach(pkg => {
            console.log(`${pkg.name} (Version: ${pkg.version})`);
        });

        console.log('\nPaquets dangereux :');
        console.log(dangerousList.length ? dangerousList.map(pkg => pkg.name).join(', ') : 'Aucun paquet dangereux trouvé.');

        console.log('\nPaquets sans danger :');
        console.log(safeList.length ? safeList.map(pkg => pkg.name).join(', ') : 'Aucun paquet sans danger trouvé.');

        rl.question('\nEntrez le nom du paquet à supprimer : ', async (packageName) => {
            if (safeList.some(pkg => pkg.name === packageName)) {
                rl.question(`Voulez-vous supprimer le paquet ${packageName} ? (o/n) `, async (confirmation) => {
                    if (confirmation.toLowerCase() === 'o') {
                        await uninstallPackage(packageName);
                        console.log(`Le paquet ${packageName} a été supprimé.`);
                    } else {
                        console.log('Opération annulée.');
                    }
                    rl.close();
                });
            } else {
                console.log(`Le paquet ${packageName} n'est pas installé ou est considéré comme dangereux.`);
                rl.close();
            }
        });
    } catch (err) {
        console.error('Une erreur est survenue :', err);
    }
}

main();