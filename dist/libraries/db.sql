-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 07, 2024 at 09:46 PM
-- Server version: 8.0.16
-- PHP Version: 8.1.23

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
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `content_type` (`content_type`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_contents`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_contents` (
  `content_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) UNSIGNED DEFAULT NULL,
  `content_type` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'app, audio, video, image, 3d, font, document, tutorial',
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `content_title` mediumtext COLLATE utf8mb4_unicode_520_ci,
  `content_slug` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `content_description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
  `content_status` varchar(10) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `contributor_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`content_id`),
  UNIQUE KEY `product_id` (`product_id`),
  KEY `item_type` (`content_type`),
  KEY `category_id` (`category_id`,`content_status`,`contributor_id`)
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
-- Table structure for table `wp_solidie_popularity`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_popularity` (
  `download_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `download_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Note: Rows older than certain period will be deleted.',
  PRIMARY KEY (`download_id`),
  KEY `content_id` (`content_id`)
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
  `download_count` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
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
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `variation_id` bigint(20) UNSIGNED NOT NULL,
  `order_status` varchar(15) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `sale_price` double UNSIGNED NOT NULL,
  `commission` double NOT NULL COMMENT 'The amount site owner will get',
  `commission_rate` double NOT NULL COMMENT 'Commission percentage site owner gets',
  `license_or_content_limit` mediumint(8) UNSIGNED DEFAULT NULL,
  `expires_on` date DEFAULT NULL,
  `renewal_date` timestamp NULL DEFAULT NULL,
  `purchase_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Order date time',
  PRIMARY KEY (`sale_id`),
  KEY `app_id` (`content_id`,`variation_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_tokens`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_tokens` (
  `token_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `data` varchar(1000) NOT NULL,
  `token` varchar(500) NOT NULL,
  `expires_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
