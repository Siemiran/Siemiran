$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$Web = Join-Path $Root "apps\web"
$Report = Join-Path $Root "project-audit-report.txt"

Set-Location $Root

$lines = New-Object System.Collections.Generic.List[string]

function Add-Section {
    param([string]$Title)

    $lines.Add("")
    $lines.Add("=" * 80)
    $lines.Add($Title)
    $lines.Add("=" * 80)
}

Add-Section "AUDIT INFORMATION"
$lines.Add("Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$lines.Add("Root: $Root")

Add-Section "GIT STATUS"
$gitStatus = git status --short
if ($gitStatus) {
    $gitStatus | ForEach-Object { $lines.Add($_) }
} else {
    $lines.Add("Working tree clean")
}

Add-Section "PRODUCT TYPE REFERENCES"
$productTypeReferences = git grep -n "interface Product" 2>$null
if ($productTypeReferences) {
    $productTypeReferences | ForEach-Object { $lines.Add($_) }
} else {
    $lines.Add("No Product interface found")
}

Add-Section "PRODUCT TYPE IMPORTS"
$productImports = git grep -n "types/product" 2>$null
if ($productImports) {
    $productImports | ForEach-Object { $lines.Add($_) }
} else {
    $lines.Add("No product type imports found")
}

Add-Section "EMPTY SOURCE FILES"
$emptyFiles = Get-ChildItem `
    -Path (Join-Path $Web "src") `
    -Recurse `
    -File |
    Where-Object { $_.Length -eq 0 } |
    ForEach-Object { $_.FullName.Replace($Root + "\", "") }

if ($emptyFiles) {
    $emptyFiles | ForEach-Object { $lines.Add($_) }
} else {
    $lines.Add("No empty source files found")
}

Add-Section "DATABASE FILES"
$dbPath = Join-Path $Web "src\features\products\database"
Get-ChildItem -Path $dbPath -Recurse -File |
    Sort-Object FullName |
    ForEach-Object {
        $relative = $_.FullName.Replace($Root + "\", "")
        $lines.Add("$relative [$($_.Length) bytes]")
    }

Add-Section "APPLICATION ROUTES"
Get-ChildItem `
    -Path (Join-Path $Web "app") `
    -Recurse `
    -File |
    Sort-Object FullName |
    ForEach-Object {
        $lines.Add($_.FullName.Replace($Root + "\", ""))
    }

Add-Section "NPM SCRIPTS"
$packagePath = Join-Path $Web "package.json"
$package = Get-Content $packagePath -Raw | ConvertFrom-Json
$package.scripts.PSObject.Properties |
    ForEach-Object {
        $lines.Add("$($_.Name): $($_.Value)")
    }

$lines | Set-Content -Encoding UTF8 $Report

Write-Host ""
Write-Host "Audit completed successfully."
Write-Host "Report created:"
Write-Host $Report
