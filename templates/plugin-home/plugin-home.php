<?php

	use Solidie\Main;
	use Solidie\Models\Contents;
	use Solidie\Setup\AdminPage;

	$temp_url = Main::$configs->url . 'templates/plugin-home/';
?>

<!-- Google Web Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Ubuntu:wght@500;700&display=swap" rel="stylesheet">

<!-- Icon Font Stylesheet -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

<!-- Libraries Stylesheet -->
<link href="<?php echo $temp_url; ?>lib/animate/animate.min.css" rel="stylesheet">
<link href="<?php echo $temp_url; ?>lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

<!-- Customized Bootstrap Stylesheet -->
<link href="<?php echo $temp_url; ?>css/bootstrap.min.css" rel="stylesheet">

<!-- Template Stylesheet -->
<link href="<?php echo $temp_url; ?>css/style.css" rel="stylesheet">




<!-- Full Screen Search Start -->
<div class="modal fade" id="searchModal" tabindex="-1">
	<div class="modal-dialog modal-fullscreen">
		<div class="modal-content" style="background: rgba(20, 24, 62, 0.7);">
			<div class="modal-header border-0">
				<button type="button" class="btn btn-square bg-white btn-close" data-bs-dismiss="modal"
					aria-label="Close"></button>
			</div>
			<div class="modal-body d-flex align-items-center justify-content-center">
				<div class="input-group" style="max-width: 600px;">
					<input type="text" class="form-control bg-transparent border-light p-3"
						placeholder="Type search keyword">
					<button class="btn btn-light px-4"><i class="bi bi-search"></i></button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Full Screen Search End -->

<!-- Service Start -->
<div class="container-fluid bg-light mt-5 py-5 searvice-container">
	<div class="container py-5">
		<div class="row g-5 align-items-center">
			<div class="col-lg-5 wow fadeIn" data-wow-delay="0.1s">
				<h1 class="mb-4">
					<?php printf( __( 'Howdy, %s' ), wp_get_current_user()->display_name ) ?>
				</h1>
				<p class="mb-4">
					<?php printf( __( 'Welcome to the ultimate digital content marketplace plugin %sSolidie%s.' ), '<strong>', '</strong>' ); ?>
					<br/>
					<?php _e( 'Your own stock Empire.', 'solidie' ); ?>
				</p>
				<a class="btn btn-primary rounded-pill px-4" href="<?php echo add_query_arg( array( 'page' => AdminPage::INVENTORY_SLUG ), admin_url( 'admin.php' ) ); ?>">
					<?php _e( 'Start Using', 'solidie' ); ?>
				</a>
			</div>
			<div class="col-lg-7">
				<div class="row g-4">
					<div class="col-md-6">
						<div class="row g-4">
							<a class="col-12 wow fadeIn" data-wow-delay="0.1s" href="<?php echo add_query_arg( array( 'page' => AdminPage::INVENTORY_SLUG ), admin_url( 'admin.php' ) ); ?>">
								<div class="service-item d-flex flex-column justify-content-center text-center rounded">
									<div class="service-icon btn-square">
										<i class="fa fa-edit fa-2x"></i>
									</div>
									<h5 class="mb-3"><?php _e( 'Inventory', 'solidie' ); ?></h5>
									<p><?php _e( 'Manage all your contents in a convenient place', 'solidie' ); ?></p>
								</div>
							</a>
							<a class="col-12 wow fadeIn" data-wow-delay="0.5s" href="<?php echo add_query_arg( array( 'page' => AdminPage::SETTINGS_SLUG ), admin_url( 'admin.php' ) ); ?>">
								<div class="service-item d-flex flex-column justify-content-center text-center rounded">
									<div class="service-icon btn-square">
										<i class="fa fa-cog fa-2x"></i>
									</div>
									<h5 class="mb-3"><?php _e( 'Settings', 'solidie' ); ?></h5>
									<p><?php _e( 'Configure plugin and streamline it\'s behaviors as per your needs', 'solidie' ); ?></p>
								</div>
							</a>
						</div>
					</div>
					<div class="col-md-6 pt-md-4">
						<div class="row g-4">
							<a class="col-12 wow fadeIn" data-wow-delay="0.3s" href="<?php echo Contents::getGalleryPermalink( false ); ?>">
								<div class="service-item d-flex flex-column justify-content-center text-center rounded">
									<div class="service-icon btn-square">
										<i class="fa fa-images fa-2x"></i>
									</div>
									<h5 class="mb-3"><?php _e( 'Content Gallery', 'solidie' ); ?></h5>
									<p><?php _e( 'Explore contents in a unified gallery with extensive filter capabilities.', 'solidie' ); ?></p>
								</div>
							</a>
							<?php
								echo apply_filters( 
									'solidie_pro_upgrade_card_home',
									'<a class="col-12 wow fadeIn" data-wow-delay="0.7s" href="https://solidie.com/" target="_blank">
										<div class="service-item d-flex flex-column justify-content-center text-center rounded">
											<div class="service-icon btn-square">
												<i class="fa fa-dollar-sign fa-2x"></i>
											</div>
											<h5 class="mb-3">' . __( 'Content Monetization', 'solidie' ) . '</h5>
											<p>' . __( 'Upgrade to Solidie Pro, monetize contents and elevate your business', 'solidie' ) . '</p>
										</div>
									</a>'
								);
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Service End -->

<!-- FAQs Start -->
<div class="container-fluid py-5">
	<div class="container py-5">
		<div class="row">
			<div class="col-12">
				<strong class="d-block">
					<?php _e( 'Got stuck?', 'solidie'); ?>
				</strong>
				<small>
					Check out <a href="https://solidie.com/gallery/documentation/solidie/0/" target="_blank"><strong>documentation</strong></a>.
				</small>
				<br/>
				<br/>

				<strong class="d-block">
					<?php _e( 'Enjoying Solidie?', 'solidie' ); ?> &#128512;
				</strong>
				<small>
					Please <a href="https://wordpress.org/plugins/solidie/#reviews" target="_blank"><strong>provide your feedback</strong></a> to help us improve functionalities.
				</small>
			</div>
		</div>
	</div>
</div>
<!-- FAQs Start -->

<!-- JavaScript Libraries -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="<?php echo $temp_url; ?>lib/wow/wow.min.js"></script>
<script src="<?php echo $temp_url; ?>lib/easing/easing.min.js"></script>
<script src="<?php echo $temp_url; ?>lib/waypoints/waypoints.min.js"></script>
<script src="<?php echo $temp_url; ?>lib/counterup/counterup.min.js"></script>
<script src="<?php echo $temp_url; ?>lib/owlcarousel/owl.carousel.min.js"></script>

<!-- Template Javascript -->
<script src="<?php echo $temp_url; ?>js/main.js"></script>