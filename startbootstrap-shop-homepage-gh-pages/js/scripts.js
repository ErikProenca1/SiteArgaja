
// function startTimer(duration, display) {

// var timer = duration, minutes, seconds;

// setInterval(function(){

//     minutes = parseInt(timer / 60, 10);
//     second = parseInt(timer % 60, 10);

//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     display.textContent = minutes + ":" + seconds;

//     if(--timer < 0){

//         timer = duration;
//     }
// }, 1000)

// windows.onload = function(){
 
//     var duration = 60 * 4;
//     var display = document.querySelector('#timer');

//     startTimer(duration, display);

// }

// };

// var min_id = null;
// var hour_id = null;

// !function(d,w){
//   calculateTime();
//   getMinutes();
//   getHours();                      
//   setInterval(calculateTime, 1000);
// }(document, window);		               

// function calculateTime() {   
//   $('.seconds .to')
//     .addClass('hide')
//     .removeClass('to')
//     .addClass('from')
//     .removeClass('hide')
//     .addClass('n')
//     .find('span:not(.shadow)').each(function (i, el) {
//     $(el).text(getSeconds());
//  });

//   $('.seconds .from:not(.n)')
//     .addClass('hide')
//     .addClass('to')
//     .removeClass('from')
//     .removeClass('hide')
//     .find('span:not(.shadow)').each(function (i, el) {
//      $(el).text(getSeconds());
//  });

//   $('.seconds .n').removeClass('n');
// }

// function getHours() {
//     var hour = new Date().getHours();  
//     hour = (hour < 10) ? "0" + hour : hour;

//     $('.hours .to')
//     .addClass('hide')
//     .removeClass('to')
//     .addClass('from')
//     .removeClass('hide')
//     .addClass('n')
//     .find('span:not(.shadow)').each(function (i, el) {
//       $(el).text(hour);
//     });

//   $('.hours .from:not(.n)')
//     .addClass('hide')
//     .addClass('to')
//     .removeClass('from')
//     .removeClass('hide')
//     .find('span:not(.shadow)').each(function (i, el) {
//       $(el).text(hour);
//     });

//     $('.hours .n').removeClass('n');

//   window.clearTimeout(hour_id);                        
// }

// function getMinutes() {                        
//   var min = new Date().getMinutes();                         
//   min = (min < 10) ? "0" + min : min;                        

//   $('.minutes .to')
//     .addClass('hide')
//     .removeClass('to')
//     .addClass('from')
//     .removeClass('hide')
//     .addClass('n')
//     .find('span:not(.shadow)').each(function (i, el) {
//      $(el).text(min);
//  });

//   $('.minutes .from:not(.n)')
//     .addClass('hide')
//     .addClass('to')
//     .removeClass('from')
//     .removeClass('hide')
//     .find('span:not(.shadow)').each(function (i, el) {
//      $(el).text(min);
//   });

//   $('.minutes .n').removeClass('n');                        
//   window.clearTimeout(min_id);

//   if ( (parseInt(min) === 0) && (parseInt(getSeconds()) === 0)) {                                   
//     hour_id = window.setTimeout(getHours, 1000);
//   }
// }

// function getSeconds() {
//   var sec = new Date().getSeconds();                          
//   if (parseInt(sec) >= 59) { 
//     min_id = window.setTimeout(getMinutes, 1000);
//   }    

//   return (sec < 10 ? '0' + sec : sec);                               
// }
// getHours();
// getMinutes();
// getSeconds();

// Create Countdown
var Countdown = {
  
  // Backbone-like structure
  $el: $('.countdown'),
  
  // Params
  countdown_interval: null,
  total_seconds     : 0,
  
  // Initialize the countdown  
  init: function() {
    
    // DOM
		this.$ = {
    	hours  : this.$el.find('.bloc-time.hours .figure'),
    	minutes: this.$el.find('.bloc-time.min .figure'),
    	seconds: this.$el.find('.bloc-time.sec .figure')
   	};

    // Init countdown values
    this.values = {
	      hours  : this.$.hours.parent().attr('data-init-value'),
        minutes: this.$.minutes.parent().attr('data-init-value'),
        seconds: this.$.seconds.parent().attr('data-init-value'),
    };
    
    // Initialize total seconds
    this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;

    // Animate countdown to the end 
    this.count();    
  },
  
  count: function() {
    
    var that    = this,
        $hour_1 = this.$.hours.eq(0),
        $hour_2 = this.$.hours.eq(1),
        $min_1  = this.$.minutes.eq(0),
        $min_2  = this.$.minutes.eq(1),
        $sec_1  = this.$.seconds.eq(0),
        $sec_2  = this.$.seconds.eq(1);
    
        this.countdown_interval = setInterval(function() {

        if(that.total_seconds > 0) {

            --that.values.seconds;              

            if(that.values.minutes >= 0 && that.values.seconds < 0) {

                that.values.seconds = 59;
                --that.values.minutes;
            }

            if(that.values.hours >= 0 && that.values.minutes < 0) {

                that.values.minutes = 59;
                --that.values.hours;
            }

            // Update DOM values
            // Hours
            that.checkHour(that.values.hours, $hour_1, $hour_2);

            // Minutes
            that.checkHour(that.values.minutes, $min_1, $min_2);

            // Seconds
            that.checkHour(that.values.seconds, $sec_1, $sec_2);

            --that.total_seconds;
        }
        else {
            clearInterval(that.countdown_interval);
        }
    }, 1000);    
  },
  
  animateFigure: function($el, value) {
    
     var that         = this,
		     $top         = $el.find('.top'),
         $bottom      = $el.find('.bottom'),
         $back_top    = $el.find('.top-back'),
         $back_bottom = $el.find('.bottom-back');

    // Before we begin, change the back value
    $back_top.find('span').html(value);

    // Also change the back bottom value
    $back_bottom.find('span').html(value);

    // Then animate
    TweenMax.to($top, 0.8, {
        rotationX           : '-180deg',
        transformPerspective: 300,
	      ease                : Quart.easeOut,
        onComplete          : function() {

            $top.html(value);

            $bottom.html(value);

            TweenMax.set($top, { rotationX: 0 });
        }
    });

    TweenMax.to($back_top, 0.8, { 
        rotationX           : 0,
        transformPerspective: 300,
	      ease                : Quart.easeOut, 
        clearProps          : 'all' 
    });    
  },
  
  checkHour: function(value, $el_1, $el_2) {
    
    var val_1       = value.toString().charAt(0),
        val_2       = value.toString().charAt(1),
        fig_1_value = $el_1.find('.top').html(),
        fig_2_value = $el_2.find('.top').html();

    if(value >= 10) {

        // Animate only if the figure has changed
        if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
        if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
    }
    else {

        // If we are under 10, replace first figure with 0
        if(fig_1_value !== '0') this.animateFigure($el_1, 0);
        if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
    }    
  }
};

// Let's go !
Countdown.init();