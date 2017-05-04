module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
      "sourceType": "module"
    },
    "extends": "airbnb-base",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "one-var": "off",
        "semi": [
            "error",
            "always"
        ],
        "no-var": "off",
        "comma-dangle": [
          "error",
          "never"
        ],
        "prefer-arrow-callback": "off",
        "strict": [
          "error",
          "global"
        ],
        "no-plusplus": [
          "error",
          { "allowForLoopAfterthoughts": true }
        ],
        "no-shadow": [
          "error",
          { "allow": ["done", "error", "resolve", "reject"]
          }
        ],
        "prefer-template": "off",
        "no-restricted-syntax": "off",
        "func-names": "off"
    }
};
