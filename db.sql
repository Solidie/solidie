-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 02, 2023 at 04:45 PM
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
-- Table structure for table `wp_appstore_contents`
--

CREATE TABLE `wp_appstore_contents` (
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `content_type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'app, audio, video, image, 3d, font, document',
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL COMMENT 'WooCommerce Product ID'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wp_appstore_hits`
--

CREATE TABLE `wp_appstore_hits` (
  `hit_id` bigint(20) UNSIGNED NOT NULL,
  `license_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Null if downloaded from dashboard or hit by free app',
  `release_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'Null if non-download action',
  `action` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'license-activate, update-check or update-download',
  `endpoint` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `ip_address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `hit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wp_appstore_license_keys`
--

CREATE TABLE `wp_appstore_license_keys` (
  `license_id` bigint(20) UNSIGNED NOT NULL,
  `sale_id` bigint(20) UNSIGNED NOT NULL,
  `license_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `endpoint` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT NULL COMMENT 'Site URL for web, any string for other apps.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wp_appstore_releases`
--

CREATE TABLE `wp_appstore_releases` (
  `release_id` bigint(20) UNSIGNED NOT NULL,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `file_id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL COMMENT 'For release edit review purpose',
  `version` varchar(20) CHARACTER SET utf8 NOT NULL,
  `changelog` longtext CHARACTER SET utf8 NOT NULL,
  `release_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_appstore_sales`
--

CREATE TABLE `wp_appstore_sales` (
  `sale_id` bigint(20) UNSIGNED NOT NULL,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `variation_id` int(11) UNSIGNED NOT NULL,
  `sale_price` double UNSIGNED NOT NULL,
  `commission` double NOT NULL COMMENT 'The amount site owner will get',
  `commission_rate` double NOT NULL,
  `license_key_limit` tinyint(3) UNSIGNED DEFAULT NULL,
  `license_expires_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wp_appstore_storemeta`
--

CREATE TABLE `wp_appstore_storemeta` (
  `meta_id` bigint(20) UNSIGNED NOT NULL,
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `meta_key` varchar(255) NOT NULL,
  `meta_value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wp_appstore_stores`
--

CREATE TABLE `wp_appstore_stores` (
  `store_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wp_cashier_receipts`
--

CREATE TABLE `wp_cashier_receipts` (
  `receipt_id` bigint(20) UNSIGNED NOT NULL,
  `subscription_id` bigint(20) UNSIGNED NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `transaction_status` varchar(20) NOT NULL,
  `amount` mediumint(8) UNSIGNED NOT NULL,
  `receipt_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wp_cashier_sales_reports`
--

CREATE TABLE `wp_cashier_sales_reports` (
  `report_id` int(10) UNSIGNED NOT NULL,
  `subscription_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `sale_price` double UNSIGNED NOT NULL,
  `is_refunded` tinyint(1) UNSIGNED NOT NULL,
  `report_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `wp_cashier_subscriptions`
--

CREATE TABLE `wp_cashier_subscriptions` (
  `subscription_id` bigint(20) UNSIGNED NOT NULL,
  `endpoint` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `content_id` bigint(20) UNSIGNED NOT NULL,
  `subscription_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `wp_appstore_contents`
--
ALTER TABLE `wp_appstore_contents`
  ADD PRIMARY KEY (`content_id`),
  ADD UNIQUE KEY `product_id_unique` (`product_id`),
  ADD KEY `store_id` (`store_id`),
  ADD KEY `item_type` (`content_type`);

--
-- Indexes for table `wp_appstore_hits`
--
ALTER TABLE `wp_appstore_hits`
  ADD PRIMARY KEY (`hit_id`),
  ADD KEY `app_id` (`license_id`,`release_id`,`action`),
  ADD KEY `endpoint` (`endpoint`,`ip_address`);

--
-- Indexes for table `wp_appstore_license_keys`
--
ALTER TABLE `wp_appstore_license_keys`
  ADD PRIMARY KEY (`license_id`),
  ADD UNIQUE KEY `license_key` (`license_key`);

--
-- Indexes for table `wp_appstore_releases`
--
ALTER TABLE `wp_appstore_releases`
  ADD PRIMARY KEY (`release_id`),
  ADD KEY `product_id` (`content_id`);

--
-- Indexes for table `wp_appstore_sales`
--
ALTER TABLE `wp_appstore_sales`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `app_id` (`content_id`,`variation_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `wp_appstore_storemeta`
--
ALTER TABLE `wp_appstore_storemeta`
  ADD PRIMARY KEY (`meta_id`),
  ADD KEY `store_id` (`store_id`,`meta_key`);

--
-- Indexes for table `wp_appstore_stores`
--
ALTER TABLE `wp_appstore_stores`
  ADD PRIMARY KEY (`store_id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `wp_cashier_receipts`
--
ALTER TABLE `wp_cashier_receipts`
  ADD PRIMARY KEY (`receipt_id`),
  ADD KEY `subscription_id` (`subscription_id`),
  ADD KEY `transaction_status` (`transaction_status`);

--
-- Indexes for table `wp_cashier_sales_reports`
--
ALTER TABLE `wp_cashier_sales_reports`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `wp_cashier_subscriptions`
--
ALTER TABLE `wp_cashier_subscriptions`
  ADD PRIMARY KEY (`subscription_id`),
  ADD KEY `app_id` (`content_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `wp_appstore_contents`
--
ALTER TABLE `wp_appstore_contents`
  MODIFY `content_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wp_appstore_hits`
--
ALTER TABLE `wp_appstore_hits`
  MODIFY `hit_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wp_appstore_license_keys`
--
ALTER TABLE `wp_appstore_license_keys`
  MODIFY `license_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wp_appstore_releases`
--
ALTER TABLE `wp_appstore_releases`
  MODIFY `release_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wp_appstore_sales`
--
ALTER TABLE `wp_appstore_sales`
  MODIFY `sale_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wp_appstore_storemeta`
--
ALTER TABLE `wp_appstore_storemeta`
  MODIFY `meta_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wp_appstore_stores`
--
ALTER TABLE `wp_appstore_stores`
  MODIFY `store_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wp_cashier_receipts`
--
ALTER TABLE `wp_cashier_receipts`
  MODIFY `receipt_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wp_cashier_sales_reports`
--
ALTER TABLE `wp_cashier_sales_reports`
  MODIFY `report_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wp_cashier_subscriptions`
--
ALTER TABLE `wp_cashier_subscriptions`
  MODIFY `subscription_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
