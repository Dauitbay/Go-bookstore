CREATE TABLE IF NOT EXISTS books (
                                     id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                     name VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication VARCHAR(255),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL
    );
