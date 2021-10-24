Accounts portal code
website: https://accounts.anciitk.in
env variables used:
1.  NEXT_PUBLIC_KRATOS_URL=http://localhost:4455/.ory/kratos/public
        The URL used with the VM. used for getting the  
2.  NEXT_PUBLIC_XENON_BASE_URL=http://localhost:4455/.xenon
        Same as above
3.  NEXT_PUBLIC_HCAPTCHA_SITEKEY="Enter your own hcaptcha site-key"
        Site-key for HCaptcha, but can use your own hcaptcha
4.  NEXT_PUBLIC_BASE_URL=http://localhost:3000
        Used as root, specifically in index page 
5.  NEXT_PUBLIC_GOOGLE_ANALYTICS (didnt implement in this file, only kept the env variable to give a token ID in the actual website)
6. NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
This URL is necessary if you want to run admin portal. Make sure to run it in port 3001 using "yarn dev -- -p 3001" 