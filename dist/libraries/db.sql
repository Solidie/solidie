-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 04, 2024 at 02:08 AM
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
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`category_id`),
  KEY `content_type` (`content_type`),
  KEY `parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_comments`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_comments` (
  `comment_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `comment_content` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_edit_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
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
  `content_slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Fillable immediately after creating entry',
  `content_description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci,
  `content_status` varchar(10) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `contributor_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`content_id`),
  UNIQUE KEY `product_id` (`product_id`),
  UNIQUE KEY `content_slug` (`content_slug`),
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
-- Table structure for table `wp_solidie_content_pack_link`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_content_pack_link` (
  `link_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `pack_id` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `enabled` tinyint(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`link_id`),
  KEY `content_id` (`content_id`,`pack_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_lessons`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_lessons` (
  `lesson_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `lesson_slug` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Fillable immediately after entry',
  `lesson_title` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `lesson_content` longtext COLLATE utf8mb4_unicode_520_ci,
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0',
  `content_id` bigint(20) NOT NULL,
  `lesson_status` varchar(10) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `sequence` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`lesson_id`),
  UNIQUE KEY `lesson_slug` (`lesson_slug`),
  KEY `lesson_status` (`lesson_status`)
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
-- Table structure for table `wp_solidie_reactions`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_reactions` (
  `reaction_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `value` tinyint(3) UNSIGNED NOT NULL COMMENT '0 dislike, 1 like, 1 to 5 rating and 1 wishlist.',
  `reaction_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'like, rating, wishlist (For now)',
  `reaction_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`reaction_id`),
  KEY `user_id` (`user_id`,`content_id`),
  KEY `reaction_type` (`reaction_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_solidie_releases`
--

CREATE TABLE IF NOT EXISTS `wp_solidie_releases` (
  `release_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `file_id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'For release edit review purpose',
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
  `parent_id` bigint(20) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Parent ID is here to simulate subscription model little bit. Subsequent renewal order will be child sales.',
  `order_status` varchar(15) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `sale_price` double UNSIGNED NOT NULL,
  `commission` double NOT NULL COMMENT 'The exact amount site owner will get',
  `commission_rate` double NOT NULL COMMENT 'Commission percentage site owner gets',
  `license_or_content_limit` mediumint(8) UNSIGNED DEFAULT NULL COMMENT 'The limit per subscription period/season',
  `downloads_in_season` mediumint(8) UNSIGNED NOT NULL DEFAULT '0' COMMENT 'Downloads in a subscription period/season. It is supposed to be used in content pack only. ',
  `expires_on` date DEFAULT NULL COMMENT 'When the subscription of app or content pack expires',
  `purchase_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Order date time',
  `enabled` tinyint(1) UNSIGNED NOT NULL DEFAULT '1',
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
  `data` varchar(1000) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `token` varchar(500) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `expires_on` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
