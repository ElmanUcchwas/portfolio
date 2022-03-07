function loadedHome() {
	;(blocked = !1),
		$loading.addClass('out'),
		setTimeout(function() {
				$textLoading.addClass('out'),
				$elem.filter('.center').removeClass('center'),
				$overlay.removeClass('--flat'),
				$home
					.find('.hide')
					.removeClass('hide')
					.addClass('animated')
		}, 500)
}

function calcLoaded() {
	;(loadedPercent = Math.round((loaded / total) * 100)),
		$loadingText.text(loadedPercent),
		TweenMax.to($loadingBarra, 0.5, {
			width: loadedPercent + '%'
		})
}

function loadImages() {
	;(loaded = words.length), calcLoaded(), loadedHome()
}
var NUM_PARTICLES = (ROWS = 26) * (COLS = 26),
	THICKNESS = Math.pow(30, 2),
	SPACING = 6,
	MARGIN = 10,
	COLOR = 220,
	DRAG = 0.75,
	EASE = 0.25,
	container,
	particle,
	canvas,
	mouse,
	stats,
	list,
	ctx,
	tog,
	man,
	dx,
	dy,
	mx,
	my,
	d,
	t,
	f,
	a,
	b,
	i,
	n,
	w,
	h,
	p,
	s,
	r,
	c
particle = {
	vx: 0,
	vy: 0,
	x: 0,
	y: 0
}
var $about,
	$txtAbout1,
	$txtAbout2,
	loadedAbout = !1,
	outAbout = !1,
	scrolling = !1,
	aboutAnimaOut = function() {
		outAbout = !0
	},
	about = function(ajax) {
		if ((($about = $('#about')), (outAbout = !1), $about.length > 0)) {
			;(loadedAbout = !0), init(), step()
			var $aboutEquipe = $('#about-equipe'),
				$equipe = $('#equipe'),
				$colR = $('#col-r'),
				$videoFull = $('#video-full'),
				$headerAbout = $('#header-about'),
				$contato = $('#contato'),
				wHeight = $(window).height(),
				wWidth = $(window).width(),
				$video = $videoFull.find('iframe')
			ajustVideo($video),
				$headerAbout.css('margin-bottom', wHeight),
				$contato.css('margin-bottom', wHeight),
				$colR.height(wHeight),
				$(window).resize(function() {
					outAbout || (ajustVideo($video), (wHeight = $(window).height()), $headerAbout.css('margin-bottom', wHeight), $contato.css('margin-bottom', wHeight), $colR.height(wHeight))
				}),
				$(window).scroll(function() {
					if (!outAbout) {
						var wTop = $(window).scrollTop(),
							topEquipe = Math.ceil($aboutEquipe.offset().top)
						if ((topEquipe > wTop ? $videoFull.removeClass('--back') : $videoFull.addClass('--back'), wWidth > 767)) {
							var hEquipe = $equipe.height(),
								hWindow = $(window).height()
							wTop > topEquipe && hEquipe + topEquipe > wTop + hWindow ? ((scrolling = !0), $aboutEquipe.addClass('fixed')) : ((scrolling = !1), $aboutEquipe.removeClass('fixed')), wTop > topEquipe ? $colR.addClass('bottom') : $colR.removeClass('bottom')
						}
					}
				}),
				ajax && $about.find('#header-about .wow').addClass('delay')
		}
	}
	$(function() {
		Modernizr.svg ||
			$('.cliente__img img').each(function() {
				var srcSvg = $(this)
						.attr('src')
						.split('/')[2],
					srcPng = srcSvg.split('.')[0]
				$(this).attr('src', 'img/clientes/' + srcPng + '.png')
			})
	})
var words = ['awesome', 'bold', 'cuckoo', 'curious', 'intense', 'loud', 'fearless', 'unique'],
	
	blocked = !0,
	total = words.length,
	count = 0,
	loaded = 0,
	loadedPercent = 0,
	randWord,
	$textLoading,
	$loading,
	$loadingBarra,
	$loadingText,
	$home,
	$moldura,
	$btClick,
	$elem,
	$overlay,
	intervaloWords,
	$gifs
$(document).ready(function() {
	;($home = $('#home')),
		($moldura = $home.find('.moldura-landing')),
		($loading = $home.find('.barra-loading')),
		($loadingBarra = $home.find('.barra-loading__barra')),
		($loadingText = $home.find('.barra-loading__porcentagem')),
		($textLoading = $home.find('.text-loading')),
		($overlay = $home.find('.overlay-landing')),
		$home.on('mousedown touchstart', '.link-landing', function(event) {
			event.stopPropagation()
		}),
		Modernizr.touch
			? ($home.on('touchstart'), $home.on('touchend'))
			: ($home.on('mousedown'),
			  $home.on('mouseup'),
			  $home.on('mouseenter', '.link-landing', function() {
					$(this).hasClass('--left') ? $moldura.find('.moldura-landing__left').addClass('--active') : $moldura.find('.moldura-landing__right').addClass('--active')
			  }),
			  $home.on('mouseleave', '.moldura-landing__left', function() {
					$moldura.find('.moldura-landing__left').removeClass('--active')
			  }),
				$home.on('mouseleave', '.moldura-landing__right', function() {
					$moldura.find('.moldura-landing__right').removeClass('--active')
			  })
			),
			($home.on('touchstart'),
			  $home.on('touchend'),
			  $home.on('touchstart', '.link-landing', function() {
					$(this).hasClass('--left') ? $moldura.find('.moldura-landing__left').addClass('--active') : $moldura.find('.moldura-landing__right').addClass('--active')
			  }),
			  $home.on('touchend', '.moldura-landing__left', function() {
					$moldura.find('.moldura-landing__right').removeClass('--active')
			  }),
				$home.on('touchend', '.moldura-landing__right', function() {
					$moldura.find('.moldura-landing__left').removeClass('--active')
			  })
			),
		$home.on('selectstart', !1)
}),
	$(document).ready(function() {
		$('body').on('submit', '.form-sing-up', function() {
			var form = $(this),
				flag = !0,
				$campo = form.find('.form-sing-up__text'),
				$msg = form.find('.form-sing-up__msg')
			return (
				'' == $campo.val() && ((flag = !1), $campo.focus()),
				1 == flag
					? $.ajax({
							type: 'POST',
							url: baseUrl + 'paginas/cadastra-newsletter.php',
							data: form.serialize(),
							success: function(data) {
								'true' == data
									? ($campo.removeClass('--error'), $msg.filter('.--error').removeClass('--show'), $msg.filter('.--success').addClass('--show'), $(form)[0].reset())
									: 'erro-campos' == data
									? $campo.addClass('--error')
									: 'erro-duplicado' == data
									? ($campo.addClass('--error'), $msg.filter('.--error').addClass('--show'), $(form)[0].reset())
									: 'erro-inserir' == data && ($campo.addClass('--error'), $msg.filter('.--error').addClass('--show'))
							},
							error: function(errorThrown) {
								console.log(errorThrown)
							}
					  })
					: ($msg.filter('.--error').addClass('--show'), $campo.addClass('--error')),
				!1
			)
		})
	})
var currentWork,
	timer,
	$work,
	$works,
	$countWorks,
	$menuItem,
	$menuLine,
	lineHeight,
	menuItemHeight,
	loadedWorks = !1,
	timerSlide = function() {
		clearTimeout(timer),
			(timer = setTimeout(function() {
				$.fn.fullpage.moveSectionDown()
			}, 9e3))
	},
	animaWorkIn = function(index) {
		;(currentWork = index),
			($currentWork = $work.eq(index)),
			$work.find('.icon-timer').removeClass('--active'),
			setTimeout(function() {
				$currentWork.find('.icon-timer').addClass('--active')
			}, 300)
		var $text = $currentWork.find('.work__title,.work__tags,.work__ver-projeto')
		TweenMax.staggerFromTo(
			$text,
			1.5,
			{
				opacity: 0,
				y: 40
			},
			{
				opacity: 1,
				y: 0,
				ease: Expo.easeOut,
				delay: 0.5
			},
			0.3
		),
			timerSlide()
	},
	worksAnimaIn = function() {
		animaWorkIn(void 0 == $currentWork ? 0 : currentWork)
	},
	worksAnimaOut = function(nextPage) {
		setTimeout(function() {
			$.fn.fullpage.destroy('all'), $works.parallax('disable'), ($currentWork = $work.eq(0))
		}, 1500),
			clearTimeout(timer)
	},
	moveActiveLine = function() {
		var top = $menuItem.filter('.active').offset().top - 0.5 * (lineHeight - menuItemHeight)
		TweenMax.to($menuLine, 0.5, {
			top: top,
			ease: Expo.easeOut
		})
	},
	works = function(ajax) {
		$(window).scrollTop(0),
			$('#works').length > 0 &&
				(loadedWorks
					? $works.parallax('enable')
					: (($works = $('#works')),
					  $works.parallax({
							invertX: !0,
							invertY: !0,
							frictionX: 0.01,
							frictionY: 0
					  }),
					  ($work = $('.work')),
					  ($countWorks = $('.count-works')),
					  ($countWorksC = $countWorks.find('.count-works__current')),
					  ($countWorksT = $countWorks.find('.count-works__total')),
					  ($menuItem = $('.menu-works .menu-works__item')),
					  ($menuLine = $('.menu-works .menu-works__line-active')),
					  (lineHeight = $menuLine.height()),
					  (menuItemHeight = $menuItem.height())),
				$('.works').fullpage({
					anchors: ['work-beach-park', 'work-shopping-recife', 'work-damas', 'work-richester', 'work-radio', 'work-lacta', 'work-midiorama', 'work-santa-joana', 'work-tang', 'work-vos'],
					menu: '.menu-works',
					lockAnchors: !0,
					sectionSelector: '.work',
					scrollingSpeed: 1e3,
					continuousVertical: !0,
					afterRender: function() {
						animaWorkIn(0), $countWorksT.text(' / ' + $work.length)
					},
					onLeave: function(index, nextIndex, direction) {
						$countWorksC.text(nextIndex), animaWorkIn(nextIndex - 1)
						var $bg = $work.eq(nextIndex - 1).find('.work__bg')
						'up' == direction
							? TweenMax.fromTo(
									$bg,
									1,
									{
										top: '-100%'
									},
									{
										top: '0'
									}
							  )
							: TweenMax.fromTo(
									$bg,
									1,
									{
										top: '0'
									},
									{
										top: '-100%'
									}
							  ),
							setTimeout(moveActiveLine, 300)
					}
				}),
				$menuItem.on('click', function() {
					var index = $menuItem.index($(this))
					return $.fn.fullpage.moveTo(index + 1), !1
				}),
				$menuLine.show(),
				moveActiveLine(),
				$(window).focus(function() {
					setTimeout(function() {
						$currentWork.find('.icon-timer').addClass('--active')
					}, 300),
						timerSlide()
				}),
				$(window).blur(function() {
					$work.find('.icon-timer').removeClass('--active'), clearTimeout(timer)
				}))
	}
works(),
	$(document).ready(function() {
		var userLang = navigator.language || navigator.userLanguage
		var pathLang = window.location.pathname

		if (window.location.href.indexOf('/app') !== -1) {
			pathLang = pathLang.split('app/')[1]
		}
		if (window.location.href.indexOf('/build') !== -1) {
			pathLang = pathLang.split('build/')[1]
		}


		function getCookie(name) {
			var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
			return v ? v[2] : null
		}

		function setCookie(name, value, days) {
			var d = new Date()
			d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
			document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
		}

		function deleteCookie(name) {
			setCookie(name, '', -1)
		}

		var currentPage,
			loadedPages = [],
			urlChange = function(page) {
				history.pushState({}, '', page.replace('/page', ''))
			},
			changePage = function(current, next) {
				'function' == typeof window[current + 'AnimaOut'] && window[current + 'AnimaOut'](),
					$barraMenu.removeClass('--close'),
					$menu.removeClass('--close'),
					$backWorks.removeClass('--close'),
					setTimeout(function() {
						$('#' + next).addClass('--in'),
							setTimeout(function() {
								$(window).scrollTop(0)
							}, 300)
					}, 300),
					'function' == typeof window[next] && window[next](!0),
					setTimeout(function() {
						positionMenu(next),
							$('#' + next)
								.removeClass('--in')
								.addClass('--active'),
							$('#' + current).remove()
					}, 1300)
			},
			loadPage = function(url, back) {
				var nextPage = getIdPage(url)
				if (nextPage == currentPage) return !1
				$.ajax({
					method: 'GET',
					url: url
				}).done(function(data) {
					back || urlChange(url)
					// var $container = $('<div id="' + nextPage + '" class="animation-container"/>')
					$container.html(data), $('body').append($container), 'about' != nextPage && 'works' != nextPage && (window.instgrm.Embeds.process(), FB.XFBML.parse()), changePage(currentPage, nextPage), (currentPage = nextPage)
				}),
					loadedPages.push(nextPage)
			},
			getIdPage = function(url) {
				var page,
					id = url
						.replace(baseUrl + idioma + '/', '')
						.replace(baseUrl, '')
						.replace('page/', '')
						.replace(hash, '')
						.replace(/\/$/, '')
						.split('/'),
					hash = window.location.hash
				return (page = '' == id[id.length - 1] ? 'home' : 'services' == id[0] ? 'services' : id[id.length - 1]), 'home' != page && 'work' != id[0] && 'works' != page && 'services' != id[0] && 'about' != page && (page = 'not-found'), page
			},

			$social = $('.social'),
			positionMenu = function(page) {
				var hash = window.location.hash,
					url = window.location.href,
					id = url
						.replace(baseUrl + idioma + '/', '')
						.replace(baseUrl, '')
						.replace('page/', '')
						.replace(hash, '')
						.replace(/\/$/, '')
						.split('/')
				$social.removeClass('--hide'),
					// $languages.removeClass('--hide'),
					'about' == page ? $menu.removeClass('--works --work --hide').addClass('--about') : 'works' == page ? $menu.addClass('--works').removeClass('--about --work --hide') : $menu.addClass('--work').removeClass('--about --works --hide'),
					'works' == page || 'about' == page ? $backWorks.addClass('--hide') : $backWorks.removeClass('--hide'),
					('home' == page || 'services' == page || ('about' != page && 'works' != page && 'work' != id[0])) && ($backWorks.addClass('--hide'), $menu.addClass('hide'))
			},
			lastScroll = 0
		$(window).scroll(function() {
			var top = $(window).scrollTop(),
				h = $(window).height(),
				wW = $(window).width()
			if (
				(top > h || (wW < 768 && top > 0)
					? ($barraMenu.addClass('--open'),
					  $menu.addClass('--open'),
					  $backWorks.addClass('--open'),
					  lastScroll < top ? ($barraMenu.addClass('--close'), $menu.addClass('--close'), $backWorks.addClass('--close')) : ($barraMenu.removeClass('--close'), $menu.removeClass('--close'), $backWorks.removeClass('--close')))
					: ($barraMenu.removeClass('--open'), $menu.removeClass('--open'), $backWorks.removeClass('--open')),
				'about' != currentPage && $('#' + currentPage).find('.navegacao-projetos').length > 0)
			) {
				var bottom = $('#' + currentPage)
					.find('.navegacao-projetos')
					.offset().top
				bottom < top + h ? ($social.addClass('--lock').css('top', bottom - 55), $languages.addClass('--lock').css('top', bottom - 55)) : ($social.removeClass('--lock').css('top', ''), $languages.removeClass('--lock').css('top', ''))
			}
			lastScroll = top
		}),
			$(window).on('popstate', function() {
				var linkPage = location.href.replace(baseUrl, ''),
					url = baseUrl + 'page/' + linkPage
				loadPage(url, !0)
			})
		var pageInit = getIdPage(window.location.href)
		loadedPages.push(pageInit),
			(currentPage = pageInit),
			$('body').on('click', '.link-page', function(event) {
				var linkPage = $(this)
						.attr('href')
						.replace(baseUrl, ''),
					url = baseUrl + 'page/' + linkPage
				if (-1 === linkPage.indexOf('/work/')) return loadPage(url), !1
			}),
			$('body').on('click', '.header-cliente__bt-scroll', function(event) {
				var top = $(window).height()
				TweenMax.to(window, 1, {
					scrollTo: top
				})
			}),
			$('body').on('click', '.languages__language', function(event) {
				if (!$(this).hasClass('--active')) {
					var url = window.location.href
					'pt' == $(this).data('lang') ? ((url = url.replace(baseUrl, baseUrl + 'pt/')), setCookie('lang', 'pt', 365)) : (url = url.replace(baseUrl + 'pt/', baseUrl)), (window.location.href = url)
				}
				return !1
			}),
			$(window).load(function() {
				var hash = window.location.hash
				if ('#contato' == hash) {
					var top = $(hash).offset().top + $(hash).height()
					$(window).scrollTop(0),
						TweenMax.to(window, 2, {
							scrollTo: top
						})
				}
			}),
			(wow = new WOW()),
			wow.init()
	})
	//appends an "active" class to .popup and .popup-content when the "Open" button is clicked
	$(".open").on("click", function(){
	  $(".popup-overlay, .popup-content").addClass("active");
	});

	//removes the "active" class to .popup and .popup-content when the "Close" button is clicked
	$(".close, .popup-overlay").on("click", function(){
	  $(".popup-overlay, .popup-content").removeClass("active");
	});
