@echo off
setlocal enabledelayedexpansion

set contador=1

rem Cambia la extensión si tus fotos no son .jpg (por ejemplo .png)
for %%f in (*.jpg) do (
  ren "%%f" "temp_!contador!.jpg"
  set /a contador+=1
)

set contador=1

for %%f in (temp_*.jpg) do (
  ren "%%f" "camiseta!contador!.jpg"
  set /a contador+=1
)

echo Renombrado terminado.
pause
