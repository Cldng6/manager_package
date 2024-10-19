@echo off
setlocal enabledelayedexpansion

echo Liste des programmes installés :
echo.

:: Liste des paquets dangereux (ajoutez ici les noms des paquets que vous considérez dangereux)
set "dangerous_packages=Paquet1 Paquet2 Paquet3"

:: Initialisation des variables
set "dangerous_list="
set "safe_list="

:: Utiliser wmic pour lister les programmes
for /f "skip=1 tokens=*" %%i in ('wmic product get name') do (
    set "program=%%i"
    if defined program (
        echo !program!

        :: Vérification si le programme est dangereux
        for %%j in (%dangerous_packages%) do (
            if /i "!program!"=="%%j" (
                set "dangerous_list=!dangerous_list! !program!"
            )
        )
        set "safe_list=!safe_list! !program!"
    )
)

echo.
echo Paquets dangereux :
if defined dangerous_list (
    echo !dangerous_list!
) else (
    echo Aucun paquet dangereux trouvé.
)

echo.
echo Paquets sans danger :
if defined safe_list (
    for %%k in (!safe_list!) do (
        set "is_dangerous=false"
        for %%j in (%dangerous_packages%) do (
            if /i "%%k"=="%%j" (
                set "is_dangerous=true"
            )
        )
        if "!is_dangerous!"=="false" (
            echo %%k
        )
    )
) else (
    echo Aucun paquet sans danger trouvé.
)

echo.
set /p paquet="Entrez le nom du paquet à supprimer : "

:: Vérifier si le paquet existe
wmic product where "name='%paquet%'" get name, version > nul

if errorlevel 1 (
    echo Le paquet %paquet% n'est pas installé.
) else (
    echo Voulez-vous supprimer le paquet %paquet% ? (o/n)
    set /p confirmation="Entrez votre choix : "

    if /i "%confirmation%"=="o" (
        :: Supprimer le paquet
        wmic product where "name='%paquet%'" call uninstall /nointeractive
        echo Le paquet %paquet% a été supprimé.
    ) else (
        echo Operation annulee.
    )
)

pause
