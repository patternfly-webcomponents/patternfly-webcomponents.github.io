$(document).ready(function() {
	
	/* ===== Affix Sidebar ===== */
	/* Ref: http://getbootstrap.com/javascript/#affix-examples */

    	
	$('#doc-menu').affix({
        offset: {
            top: ($('#header').outerHeight(true) + $('#doc-header').outerHeight(true)) ,
            bottom: ($('#footer').outerHeight(true)) + 75
        }
    });
    
    /* Hack related to: https://github.com/twbs/bootstrap/issues/10236 */
    $(window).on('load resize', function() {
        $(window).trigger('scroll'); 
    });

    /* Activate scrollspy menu */
    $('body').scrollspy({target: '#doc-nav', offset: 100});
    
    /* Smooth scrolling */
	$('a.scrollto').on('click', function(e){
        //store hash
        var target = this.hash;    
        e.preventDefault();
		$('body').scrollTo(target, 800, {offset: 0, 'axis':'y'});
		
	});

    /* Utilization Bar Charts */
    startThresholdIncrements();

    var inlineLayout = {
        'type': 'inline'
    };
    function startThresholdIncrements() {
        setInterval(function () {
        var thresholdExample = document.querySelector('#thresholdExample1');
        if(thresholdExample){
            incrementThreshold(thresholdExample, 10);
        }
        thresholdExample = document.querySelector('#thresholdExample2');
        if(thresholdExample){
            incrementThreshold(thresholdExample, 2);
        }
        thresholdExample = document.querySelector('#thresholdExample3');
        if(thresholdExample){
            incrementThreshold(thresholdExample, 5);
        }
        thresholdExample = document.querySelector('#thresholdExample4');
        if(thresholdExample){
            incrementThreshold(thresholdExample, 10);
        }

        function incrementThreshold(thresholdExample, increment) {
            var newThreshold = parseInt(thresholdExample.getAttribute("used")) + increment;
            var maxThreshold = parseInt(thresholdExample.getAttribute("total"));
            if (newThreshold > maxThreshold) {
                newThreshold = 5;
            }
            thresholdExample.setAttribute("used", newThreshold);
        }
        }, 500);
        // Listen for the threshold changed event.
        document.addEventListener('thresholdSet', function (e) {
        var id = e.detail.id;
        if(id === 'thresholdExample1') {
            var threshold = e.detail.threshold;
            var thresholdChangedText = document.querySelector('#thresholdChangedText');
            if(thresholdChangedText){
                var msg = threshold.substr(threshold.lastIndexOf('-') + 1);
                if (msg === 'warning') {
                    msg = "Warning! You should look at this.";
                    thresholdChangedText.setAttribute("class", 'text-warning');
                } else if (msg === 'danger') {
                    msg = "Danger!!  Seriously, something's wrong!";
                    thresholdChangedText.setAttribute("class", 'text-danger');
                } else if (msg === 'success') {
                    msg = "Whew...Everythings normal :-)";
                    thresholdChangedText.setAttribute("class", 'text-success');
                }
                thresholdChangedText.innerText = msg;
            }
        }
        }, false);
    }

});