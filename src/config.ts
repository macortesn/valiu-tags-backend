
interface MongoDB {
    URI: string;
}

interface Config {
    PORT: string | number,
    MONGODB: MongoDB;
}

let config: Config;

if (process.env.NODE_ENV === 'test') {
    config = {
        PORT: process.env.PORT || 3000,
        MONGODB: {
            URI: process.env.MONGODB_URI || "mongodb://localhost:27017/valiu-test"
        }
    }
} else if (process.env.NODE_ENV === 'production') {
    config = {
        PORT: process.env.PORT || 3000,
        MONGODB: {
            URI: process.env.MONGODB_URI || ""
        }
    }
} else {
    config = {
        PORT: process.env.PORT || 3000,
        MONGODB: {
            URI: process.env.MONGODB_URI || "mongodb://localhost:27017/valiu-dev"
        }
    }
}

export default config