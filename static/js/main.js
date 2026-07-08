/**
 * MIKA LEMON Inc. - jQuery 主脚本
 */
$(function () {

  // 1. Navbar scroll shadow
  $(window).on('scroll', function () {
    $('.navbar').toggleClass('scrolled', $(this).scrollTop() > 100);
  });

  // 2. Smooth scroll for anchor links
  $(document).on('click', 'a[href^="#"]', function (e) {
    var target = $(this.hash);
    if (target.length) {
        e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 600);
      }
    });

  // 3. Stats counter animation (Intersection Observer + jQuery)
  var statsEl = $('.stats-section')[0];
  if (statsEl) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          $('.stat-number').each(function () {
            var $this = $(this);
            var target = parseInt($this.data('target'));
            if (isNaN(target)) return;
            $({ count: 0 }).animate({ count: target }, {
              duration: 2000,
              easing: 'swing',
              step: function () { $this.text(Math.ceil(this.count) + '+'); },
              complete: function () { $this.text(target + '+'); }
      });
          });
          observer.unobserve(entry.target);
  }
      });
    }, { threshold: 0.5 });
    observer.observe(statsEl);
  }

  // 4. Fade-up scroll reveal (Intersection Observer)
  $('.fade-up').each(function () {
    var el = this;
    var ro = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
          $(entry.target).addClass('visible');
          ro.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    ro.observe(el);
  });

  // 5. Mobile menu toggle
  $('.menu-toggle').on('click', function () {
    $('.nav-links').toggleClass('open');
  });

  // 6. Close mobile menu on link click
  $('.nav-links a').on('click', function () {
    $('.nav-links').removeClass('open');
  });
});

