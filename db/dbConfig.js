require('dotenv').config();
const { Pool, Client } = require('pg');
const connectionString = process.env.DB_URL;
const tries = 5;

const pool = new Pool({
    connectionString: connectionString,
});

while (tries > 0) {
    try {
        pool.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'", (err, res) => {
            if (err)
                console.log(err);
            else {
                if (!res.rowCount) {
                    console.log("Database not found");
                    console.log("Creating");

                    pool.query(`CREATE TABLE USER_ACCOUNT (
                                    email VARCHAR(80) NOT NULL,
                                    name VARCHAR(50) NOT NULL,
                                    password CHAR(60) NOT NULL,
                                    
                                    CONSTRAINT USER_ACCOUNT_PK PRIMARY KEY (email)
                                );
                                CREATE TABLE RECIPE (
                                    recipeId SERIAL NOT NULL,
                                    userEmail VARCHAR(80) NOT NULL,
                                    name VARCHAR(60) NOT NULL,
                                    time REAL,
                                    portions SMALLINT,
                                    visibility BOOLEAN NOT NULL,
                                    steps VARCHAR(1000) NOT NULL,
                                    
                                    CONSTRAINT RECIPE_PK PRIMARY KEY (recipeId),
                                    CONSTRAINT RECIPE_USER_ACCOUNT_FK FOREIGN KEY (userEmail)
                                        REFERENCES USER_ACCOUNT (email)  ON DELETE CASCADE
                                );
                                CREATE TABLE RECIPE_BOOK (
                                    bookId SERIAL NOT NULL,
                                    userEmail VARCHAR(80) NOT NULL,
                                    title VARCHAR(60) NOT NULL,
                                    description VARCHAR(200),
                                    visibility BOOLEAN NOT NULL,
                                    
                                    CONSTRAINT RECIPE_BOOK_PK PRIMARY KEY (bookId),
                                    CONSTRAINT RECIPE_BOOK_USER_ACCOUNT_FK FOREIGN KEY (userEmail)
                                        REFERENCES USER_ACCOUNT (email)  ON DELETE CASCADE ON UPDATE CASCADE
                                );
                                CREATE TABLE USER_SESSION (
                                    sessionId CHAR(32) NOT NULL,
                                    userEmail VARCHAR(80) NOT NULL,
                                    expirationDate DATE NOT NULL,
                                    
                                    CONSTRAINT USER_SESSION_UK UNIQUE (sessionId),
                                    CONSTRAINT USER_SESSION_USER_ACCOUNT_FK FOREIGN KEY (userEmail)
                                        REFERENCES USER_ACCOUNT (email)  ON DELETE CASCADE ON UPDATE CASCADE
                                );
                                CREATE TABLE FAVORITE (
                                    userEmail VARCHAR(80) NOT NULL,
                                    recipeLink VARCHAR(100) NOT NULL,
									recipeImage VARCHAR(200) NOT NULL,
									recipeTitle VARCHAR(60) NOT NULL,
                                    
                                    CONSTRAINT STEP_UK UNIQUE (userEmail, recipeLink),
                                    CONSTRAINT STEP_USER_ACCOUNT_FK FOREIGN KEY (userEmail)
                                        REFERENCES USER_ACCOUNT (email)  ON DELETE CASCADE ON UPDATE CASCADE
                                );
                                CREATE TABLE CATEGORY (
                                    idCategory SMALLSERIAL NOT NULL,
                                    name VARCHAR(30) NOT NULL,
                                    
                                    CONSTRAINT CATEGORY_PK PRIMARY KEY (idCategory)
                                );
                                CREATE TABLE INGREDIENT (
                                    ingredientId SERIAL NOT NULL,
                                    name VARCHAR(30) NOT NULL,
                                    
                                    CONSTRAINT INGREDIENT_PK PRIMARY KEY (ingredientId)
                                );
                                CREATE TABLE contains (
                                    recipeId SERIAL NOT NULL,
                                    bookId SERIAL NOT NULL,
                                    
                                    CONSTRAINT contains_UK UNIQUE (recipeId, bookId),
                                    CONSTRAINT contains_RECIPE_FK FOREIGN KEY (recipeId)
                                        REFERENCES RECIPE (recipeId)  ON DELETE CASCADE,
                                    CONSTRAINT contains_RECIPE_BOOK_FK FOREIGN KEY (bookId)
                                        REFERENCES RECIPE_BOOK (bookId)  ON DELETE CASCADE
                                );
                                CREATE TABLE uses (
                                    ingredientId SERIAL NOT NULL,
                                    recipeId SERIAL NOT NULL,
                                    unit VARCHAR(25),
                                    quantity SMALLINT,
                                    
                                    CONSTRAINT uses_UK UNIQUE (ingredientId, recipeId),
                                    CONSTRAINT uses_INGREDIENT_FK FOREIGN KEY (ingredientId)
                                        REFERENCES INGREDIENT (ingredientId)  ON DELETE CASCADE,
                                    CONSTRAINT uses_RECIPE_FK FOREIGN KEY (recipeId)
                                        REFERENCES RECIPE (recipeId)  ON DELETE CASCADE
                                );
                                CREATE TABLE categorizes (
                                    idCategory SMALLSERIAL NOT NULL,
                                    recipeId SERIAL NOT NULL,
                                    
                                    CONSTRAINT categorizes_UK UNIQUE (idCategory, recipeId),
                                    CONSTRAINT categorizes_CATEGORY_FK FOREIGN KEY (idCategory)
                                        REFERENCES CATEGORY (idCategory)  ON DELETE CASCADE,
                                    CONSTRAINT categorizes_RECIPE_FK FOREIGN KEY (recipeId)
                                        REFERENCES RECIPE (recipeId)  ON DELETE CASCADE
                                );`, (err, res) => {
                        if (err) {
                            console.log("Failed creating Database");
                            console.log(err);
                        } else {
                            console.log('Database \x1b[32mOK\x1b[0m');
                        }
                    });
                }

                else if (res.rowCount != 10)
                    throw '\x1b[33mFaulty database in project\n\x1b[33mDelete dbdata and start project again';

                else
                    console.log('Database \x1b[32mOK\x1b[0m');
            }
        });
        break;
    } catch (err) {
        console.log(err);
        tries--;
    }
}
module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
}
