# Get Credentials
$header = @{
    'Authorization' = 'Basic {0}' -f $env:SPACESHIP_APIKEY
    'Accept'        = 'application/json'
    'Content-Type'  = 'application/json'
}

# Get OAuth Bearer token
$url = 'https://api.spaceshipinvest.com.au/v0/external/user/login'
try {
    $IRMParams = @{
        Uri     = $url
        Method  = 'Post'
        Headers = $header
    }
    $Response = Invoke-RestMethod @IRMParams -ErrorAction Stop
}
catch {
    exit(1)
}

if ($Response.auth.auth_token) {
    # Set OAuth Headers
    $header = @{
        'Authorization' = 'Bearer {0}' -f $Response.auth.auth_token
        'Accept'        = 'application/json'
        'Content-Type'  = 'application/json'
    }

    # Get unit prices
    foreach ($Item in 'UNIVERSE','INDEX','EARTH') {
        $url = 'https://api.spaceshipinvest.com.au/v0/external/saver/unit-price/graph?portfolio={0}&date=1970-01-01' -f $Item
        try {
            $IRMParams = @{
                Uri     = $url
                Method  = 'Get'
                Headers = $header
            }
            $Response = Invoke-RestMethod @IRMParams -ErrorAction Stop
        }
        catch {
            exit(1)
        }
        $Response.unit_prices | ConvertTo-Json | Out-File -FilePath "./datasets/$($Item).json"
        $Response.unit_prices | ConvertTo-Csv -NoTypeInformation | Out-File -FilePath "./datasets/$($Item).csv"
    }
}
