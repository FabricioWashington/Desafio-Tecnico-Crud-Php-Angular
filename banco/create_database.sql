CREATE DATABASE financeiro;
use financeiro;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);
CREATE TABLE transacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    tipo ENUM('Despesa', 'Receita'),
    idCategoria INT NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (idCategoria) REFERENCES categorias(id)
);

CREATE TABLE `sessions` (
    `id` varchar(191) NOT NULL,
    `user_id` bigint(20) unsigned DEFAULT NULL,
    `ip_address` varchar(45) DEFAULT NULL,
    `user_agent` text,
    `payload` longtext,
    `last_activity` int(10) unsigned DEFAULT 0,
    PRIMARY KEY (`id`),
    KEY `sessions_user_id_index` (`user_id`),
    KEY `sessions_ip_address_index` (`ip_address`),
    KEY `sessions_last_activity_index` (`last_activity`)
);
