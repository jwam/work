$source = "C:\work\test"
$destination = "C:\work\backup"
$delyear = -7
$today = Get-Date

# 指定フォルダ以下のファイルをバックアップ先フォルダに移動する。
# バックアップ先フォルダに現在日のフォルダを作成する。

# (ZIPなし)作成したフォルダに全てのファイルを移動する。
$destinationPath = $destination + "\" + $today.ToString("yyyyMMdd")
$sourceFile = $source + "\*.*"
New-Item  $destinationPath -itemType Directory -Force
Move-Item $sourceFile $destinationpath


# (ZIPあり)移動後ZIPファイルを作成する。
# Power ShellのバージョンによりZIPファイル作成が呼べるかどうかがわからない
# Add-Type -AssemblyName System.IO.Compression.FileSystem
# [io.compression.zipfile]::CreateFromDirectory($source, $destination)


# ７年以上経過していた場合、ファイルを削除する。
$LastWrite = $today.AddYears($delyears)
$Files = Get-Childitem $destination -Recurse | Where {$_.LastWriteTime -le $LastWrite}
foreach ($File in $Files)
{
    if ($File -ne $NULL)
    {
        write-host $File.LastWriteTime -ForegroundColor "DarkRed" 
        write-host "Deleting File $File " -ForegroundColor "DarkRed" 
        Remove-Item $File.FullName
    }
}
# Get-ChildItem $destination | Where-Object {$_.LastWriteTime -lt (Get-Date).AddYears($delyears)} | ForEach-Object {$_.Delete()}

