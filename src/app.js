$( "#about-btn" ).on("click", function() {
    if ( $("#slider").first().is(":hidden")){
        $( "#slider" ).show( "slow" );
    }
    else $("#slider").slideUp();
    });
