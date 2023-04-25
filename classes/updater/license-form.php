<?php 
	$license       = $this->get_license();
	$product_title = $this->app_name;
	$class_name    = $license ? ( $license['activated'] ? 'appstore-license-is-valid' : 'appstore-license-is-invalid' ) : '';
	$field_value   = $license ? ( $license['license_key'] ?? '' ) : '';
?>

<div class="appstore-license-window">
    <div class="appstore-license-card">
        <div>
            <h1><?php echo $this->app_name . ' ' . __( 'License' ); ?></h1>
        </div>

        <?php if ( $license !== null ) : ?>
            <?php if ( $license['activated'] == true ) : ?>
                <div class="appstore-license-alert-success">
                    <div class="appstore-license-alert-icon">
                        <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><defs/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 41c9.389 0 17-7.611 17-17S33.389 7 24 7 7 14.611 7 24s7.611 17 17 17zm-8.434-16.145a.928.928 0 00.19.29l6.023 6c.08.093.178.168.288.22a.97.97 0 00.74 0 .852.852 0 00.29-.22l10.666-10.61a.928.928 0 00.189-.289 1.066 1.066 0 000-.74.887.887 0 00-.19-.289l-1.34-1.303a.842.842 0 00-.629-.289.906.906 0 00-.37.074.975.975 0 00-.3.215l-8.678 8.678-4.043-4.05a.985.985 0 00-.307-.215.878.878 0 00-.71 0 .806.806 0 00-.29.215l-1.34 1.284a.89.89 0 00-.189.29 1.067 1.067 0 000 .74z" fill="#24A148"/></svg>
                    </div>
                    <div class="appstore-license-alert-title">
                        Congratulation
                    </div>
                    <div class="appstore-license-alert-message">
                        <?php  echo ! empty( $license['message'] ) ? $license['message'] : sprintf( __( 'Your %s is connected to the license system and will now receive automatic updates.' ), $product_title ); ?>
                    </div>
                </div>
            <?php else : ?>
                <div class="appstore-license-alert-error">
                    <div class="appstore-license-alert-icon">
                        <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg"><defs/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 41c9.389 0 17-7.611 17-17S33.389 7 24 7 7 14.611 7 24s7.611 17 17 17zm8.465-11.118c.002-.2-.032-.4-.1-.588a1.475 1.475 0 00-.324-.484l-4.819-4.812 4.837-4.808a1.492 1.492 0 00.44-1.072 1.607 1.607 0 00-.44-1.12l-1.07-1.073c-.15-.14-.326-.25-.518-.324a1.735 1.735 0 00-1.17 0 1.44 1.44 0 00-.484.324l-4.801 4.829-4.82-4.83a1.39 1.39 0 00-.49-.323 1.735 1.735 0 00-1.17 0 1.619 1.619 0 00-.51.324l-1.067 1.072c-.144.15-.254.33-.323.526-.067.191-.101.392-.101.595-.002.2.032.398.1.585.073.184.183.35.324.487l4.784 4.808-4.802 4.812a1.494 1.494 0 00-.441 1.072c0 .201.038.4.111.588.075.198.187.379.33.533l1.07 1.072c.149.14.324.25.515.324.188.067.387.101.587.1.199.003.397-.031.583-.1.183-.074.348-.184.487-.324l4.798-4.846 4.819 4.84c.14.14.308.251.493.323.185.067.38.102.577.1.202.002.403-.032.594-.1.188-.074.36-.184.507-.324l1.07-1.072c.142-.152.252-.33.323-.526.066-.19.1-.388.101-.588z" fill="#F44337"/></svg>
                    </div>
                    <div class="appstore-license-alert-title">
                        <?php echo __( 'Valid Key Required' ) ?>
                    </div>
                    <div class="appstore-license-alert-message">
                        <?php echo ! empty( $license['message'] ) ? $license['message'] : sprintf( __( 'You have entered an invalid license key. Please insert a valid one if you have purchased %s.' ), $product_title ); ?>
                    </div>
                </div>
            <?php endif; ?>

            <?php if ( $license !== null && $license['activated'] ) : ?>
                <div class="appstore-license-fieldset">
                    <div class="appstore-license-fieldset-label">
                        Licensed To:
                    </div>
                    <div class="appstore-license-fieldset-content">
                        <?php echo $license['licensee']; ?>
                    </div>
                </div>

                <?php if ( $license['license_type'] ) : ?>
                    <div class="appstore-license-fieldset">
                        <div class="appstore-license-fieldset-label">
                            License Type:
                        </div>
                        <div class="appstore-license-fieldset-content">
                            <?php echo ucwords( $license['license_type'] ); ?>
                        </div>
                    </div>
                <?php endif; ?>

                <div class="appstore-license-fieldset">
                    <div class="appstore-license-fieldset-label">
                        Expires on:
                    </div>
                    <div class="appstore-license-fieldset-content">
                        <?php echo $license['expires_on'] ? $license['expires_on'] : 'Never'; ?>
                    </div>
                </div>
            <?php endif; ?>
        <?php endif; ?>

        <div id="appstore-license-key-form">
            <div class="appstore-license-fieldset">
                <div class="appstore-license-fieldset-content">
                    <input name="license-key" type="text" placeholder="Enter your license key here" value="<?php echo esc_attr( $field_value ); ?>" class="<?php echo esc_attr( $class_name ); ?>">
                    <div class="appstore-license-help-text">If you have a <?php echo $product_title; ?> license, please paste your code here. Or purchase one.</div>
                </div>
            </div>

            <div class="appstore-license-actions">
                <button type class="button button-primary">Connect With License Key</button>
            </div>
		</div>
    </div>
</div>