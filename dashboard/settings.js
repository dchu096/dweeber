{
    "website" : {
      "support": "https://support.your_domain.com",
      "domain": "https://panel.example.com"
    },
    "config": {
        "http": {
          "port": 8080
        },
        "https": {
            "paths": {
                "privkey": "./privkey.key",
                "fullchain": "./fullchain.pem",
                "chain": "./chain.pem"
            },
            "enabled": true,
            "port": 8443
        },
        "callback": "https://your_domain.com/callback",
        "clientID": "your_bot_client_id",
        "secret": "your_bot_client_secret"
    }
  }
