module.exports = {
    "extends": "airbnb",
    "rules": {
        "prefer-destructuring": ["error", {
            "array": false,
            "object": true
        }, {
                "enforceForRenamedProperties": false
            }]
    }
};
