#scr:https://dribbble.com/shots/1818748-Appon-Chat-Widget
conf =
	cursorcolor:"#696c75"
	cursorwidth:"4px"
	cursorborder :"none"

lol =
	cursorcolor:"#cdd2d6"
	cursorwidth:"4px"
	cursorborder :"none"

NYLM=["Hai","Hello","How are you doing?","I am doing Good","I will take the medicine","I was a little tired today"]

getRandomInt = (min, max)->
	return Math.floor(Math.random() * (max - min + 1)) + min;

claerResizeScroll=()->
	$ "#texxt"
		.val("")
	$ ".messages"
		.getNiceScroll 0
			.resize()
	$ ".messages"
		.getNiceScroll 0
			.doScrollTop 999999,999


insertI = ()->
	innerText = $.trim($("#texxt").val())
	if (innerText != "")
			$ ".messages"
				.append "<li class=\"i\"><div class=\"head\"><span class=\"time\">#{new Date().getHours()}:#{new Date().getMinutes()} AM, Today</span><span class=\"name\"> Буль</span></div><div class=\"message\">#{innerText}</div></li>"
			claerResizeScroll()

			otvet = setInterval ()->
				$ ".messages"
					.append "<li class=\"friend-with-a-SVAGina\"><div class=\"head\"><span class=\"name\">Юния  </span><span class=\"time\">#{new Date().getHours()}:#{new Date().getMinutes()} AM, Today</span></div><div class=\"message\">#{NYLM[getRandomInt(0,NYLM.length-1)]}</div></li>"
				claerResizeScroll()
				clearInterval otvet
			,getRandomInt 2500,500

$ document
	.ready ()->
		$ ".list-friends"
			.niceScroll conf

		$ ".messages"
			.niceScroll lol
				# .doScrollTop 999999,1

		$ "#texxt"
			.keypress (e)->
				if e.keyCode==13
					insertI()
					return false

		$ ".send"
			.click ()->
				insertI()