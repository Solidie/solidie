-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 01, 2023 at 09:43 PM
-- Server version: 8.0.16
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `local`
--

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_categories`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_categories` (
  `category_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `content_type` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_contents`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_contents` (
  `content_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `content_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'app, audio, video, image, 3d, font, document',
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'WooCommerce Product ID',
  `content_title` mediumtext COLLATE utf8mb4_unicode_520_ci,
  `content_description` longtext COLLATE utf8mb4_unicode_520_ci,
  PRIMARY KEY (`content_id`),
  UNIQUE KEY `product_id_unique` (`product_id`),
  KEY `item_type` (`content_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_content_meta`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_content_meta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `object_id` bigint(20) UNSIGNED NOT NULL,
  `meta_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `meta_value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`meta_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_hits`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_hits` (
  `hit_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `license_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Null if downloaded from dashboard or hit by free app',
  `release_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Null if non-download action',
  `action` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'license-activate, update-check or update-download',
  `endpoint` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'url, app id, download page name etc.\r\n',
  `ip_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `hit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hit_id`),
  KEY `app_id` (`license_id`,`release_id`,`action`),
  KEY `endpoint` (`endpoint`,`ip_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_license_keys`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_license_keys` (
  `license_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sale_id` bigint(20) UNSIGNED NOT NULL,
  `license_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `endpoint` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Site URL for web, any string for other apps.',
  PRIMARY KEY (`license_id`),
  UNIQUE KEY `license_key` (`license_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_releases`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_releases` (
  `release_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `file_id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'For release edit review purpose',
  `version` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Will be null for non-app contents',
  `changelog` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci COMMENT 'Will be null for non-app contents',
  `release_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`release_id`),
  KEY `product_id` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_sales`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_sales` (
  `sale_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `variation_id` bigint(20) UNSIGNED NOT NULL,
  `sale_price` double UNSIGNED NOT NULL,
  `commission` double NOT NULL COMMENT 'The amount site owner will get',
  `commission_rate` double NOT NULL COMMENT 'Commission percentage site owner gets',
  `license_key_limit` smallint(5) UNSIGNED DEFAULT NULL,
  `license_expires_on` date DEFAULT NULL,
  `sold_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Order date time',
  PRIMARY KEY (`sale_id`),
  KEY `app_id` (`content_id`,`variation_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_tags`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_tags` (
  `tag_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_tag_relations`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_tag_relations` (
  `tag_relation_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tag_id` bigint(20) UNSIGNED NOT NULL,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`tag_relation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
