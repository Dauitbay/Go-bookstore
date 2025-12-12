CREATE TABLE refresh_tokens (
                                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                                created_at DATETIME(3),
                                updated_at DATETIME(3),
                                deleted_at DATETIME(3),
                                token VARCHAR(512) NOT NULL UNIQUE,
                                user_id BIGINT UNSIGNED NOT NULL,
                                expires_at DATETIME(3) NOT NULL,
                                INDEX (user_id)
);
