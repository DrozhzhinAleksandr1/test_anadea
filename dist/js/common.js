window.onload=function(){function e(e){a(e),g.classList.contains("startTimer")||g.classList.add("startTimer"),g.classList.contains("containerForCards_disabled")&&g.classList.remove("containerForCards_disabled"),clearInterval(T),G=1,_.innerHTML=0,H.innerHTML=0,u.innerHTML=0,p.innerHTML=0,F.classList.contains("containerWithInformations__btn_resume")&&(F.classList.add("containerWithInformations__btn_pause"),F.classList.remove("containerWithInformations__btn_resume"),F.innerHTML="пауза")}function n(e,n){var a,s,t=document.createElement("div"),r=document.createElement("div");if(t.className="containerForCards__cards containerForCards__cards_inGame containerForCards__cards_number"+e,t.setAttribute("data-elem-number",n),r.classList.add("containerForCards__frontOfCard"),6==M.value){var o,i=n%6;o=n<=6?0:n>6&&n<=12?1:2}if(8==M.value){var o,i=n%8;n<=8?o=0:n>8&&n<=16?o=1:n>16&&n<=24?o=2:n>24&&n<=32&&(o=3)}if(10==M.value){var o,i=n%10;n<=10?o=0:n>10&&n<=20?o=1:n>20&&n<=30?o=2:n>30&&n<=40?o=3:n>40&&n<=50&&(o=4)}if(12==M.value){var o,i=n%12;n<=12?o=0:n>12&&n<=24?o=1:n>24&&n<=36?o=2:n>36&&n<=48?o=3:n>48&&n<=60?o=4:n>60&&n<=72?o=5:n>72&&n<=84&&(o=6)}a=0==i?"0%":9*i+"%",s=0==o?"0%":9*o+"%",r.style.cssText="background-position:"+a+" "+s+";",t.appendChild(r),g.appendChild(t)}function a(e){d=e*e,halfMaxNumber=d/2,g.innerHTML="";for(var a=[],s=1;s<=d;s++)a[s-1]=s;for(var t=1;t<=d;t++){var r=Math.floor(Math.random()*a.length),o=a[r];o>halfMaxNumber&&(o-=halfMaxNumber),n(e,o),a.splice(r,1)}}function s(e){e.classList.add("containerForCards__cards_selected")}function t(e){x=!1,setTimeout(function(){for(var n=1;n>=0;n--)e[n].classList.remove("containerForCards__cards_selected");x=!0,+d==+m()&&(r(),o())},700)}function r(){6==+M.value&&(u.innerHTML=10*_.innerHTML-H.innerHTML-Math.floor(p.innerHTML/10)),8==+M.value&&(u.innerHTML=20*_.innerHTML-H.innerHTML-Math.floor(p.innerHTML/10)),10==+M.value&&(u.innerHTML=40*_.innerHTML-H.innerHTML-Math.floor(p.innerHTML/10)),12==+M.value&&(u.innerHTML=80*_.innerHTML-H.innerHTML-Math.floor(p.innerHTML/10))}function o(){6==+M.value&&f.innerHTML<u.innerHTML&&(v.innerHTML=H.innerHTML,f.innerHTML=u.innerHTML,P.innerHTML=p.innerHTML,localStorage.pointsForGames6LosePointsPerGame=H.innerHTML,localStorage.pointsForGames6WinPointsPerGame=u.innerHTML,localStorage.pointsForGames6ElapsedTimePerGame=p.innerHTML),8==+M.value&&N.innerHTML<u.innerHTML&&(C.innerHTML=H.innerHTML,N.innerHTML=u.innerHTML,y.innerHTML=p.innerHTML,localStorage.pointsForGames8LosePointsPerGame=H.innerHTML,localStorage.pointsForGames8WinPointsPerGame=u.innerHTML,localStorage.pointsForGames8ElapsedTimePerGame=p.innerHTML),10==+M.value&&b.innerHTML<u.innerHTML&&(B.innerHTML=H.innerHTML,b.innerHTML=u.innerHTML,S.innerHTML=p.innerHTML,localStorage.pointsForGames10LosePointsPerGame=H.innerHTML,localStorage.pointsForGames10WinPointsPerGame=u.innerHTML,localStorage.pointsForGames10ElapsedTimePerGame=p.innerHTML),12==+M.value&&W.innerHTML<u.innerHTML&&(h.innerHTML=H.innerHTML,W.innerHTML=u.innerHTML,I.innerHTML=p.innerHTML,localStorage.pointsForGames12LosePointsPerGame=H.innerHTML,localStorage.pointsForGames12WinPointsPerGame=u.innerHTML,localStorage.pointsForGames12ElapsedTimePerGame=p.innerHTML)}function i(){var e=document.getElementsByClassName("containerForCards__cards_selected");if(2==e.length)if(e[0].getAttribute("data-elem-number")==e[1].getAttribute("data-elem-number")){for(var n=1;n>=0;n--)e[n].classList.add("containerForCards__cards_disabled");_.innerHTML=+_.innerHTML+1,t(e)}else t(e),H.innerHTML=+H.innerHTML+1}function m(){return document.getElementsByClassName("containerForCards__cards_disabled").length}function l(){g.classList.contains("startTimer")&&(g.classList.remove("startTimer"),T=setInterval(function(){p.innerHTML=G++},1e3))}function c(){+d==+m()&&clearInterval(T)}function L(){void 0!=localStorage.pointsForGames6WinPointsPerGame&&(v.innerHTML=localStorage.pointsForGames6LosePointsPerGame,f.innerHTML=localStorage.pointsForGames6WinPointsPerGame,P.innerHTML=localStorage.pointsForGames6ElapsedTimePerGame),void 0!=localStorage.pointsForGames8WinPointsPerGame&&(C.innerHTML=localStorage.pointsForGames8LosePointsPerGame,N.innerHTML=localStorage.pointsForGames8WinPointsPerGame,y.innerHTML=localStorage.pointsForGames8ElapsedTimePerGame),void 0!=localStorage.pointsForGames10WinPointsPerGame&&(B.innerHTML=localStorage.pointsForGames10LosePointsPerGame,b.innerHTML=localStorage.pointsForGames10WinPointsPerGame,S.innerHTML=localStorage.pointsForGames10ElapsedTimePerGame),void 0!=localStorage.pointsForGames12WinPointsPerGame&&(h.innerHTML=localStorage.pointsForGames12LosePointsPerGame,W.innerHTML=localStorage.pointsForGames12WinPointsPerGame,I.innerHTML=localStorage.pointsForGames12ElapsedTimePerGame)}var d,T,M=document.getElementsByClassName("containerWithInformations__cardGameSize")[0],g=document.getElementsByClassName("containerForCards")[0],_=document.getElementsByClassName("pointsForGames__text")[0].getElementsByTagName("span")[0],H=document.getElementsByClassName("pointsForGames__text")[1].getElementsByTagName("span")[0],u=document.getElementsByClassName("pointsForGames__text")[2].getElementsByTagName("span")[0],p=document.getElementsByClassName("pointsForGames__text")[3].getElementsByTagName("span")[0],G=1,F=document.getElementsByClassName("containerWithInformations__btn")[0],E=document.getElementsByClassName("containerWithInformations__btn")[1],v=document.getElementsByClassName("pointsForGames_6")[0].getElementsByTagName("span")[0],f=document.getElementsByClassName("pointsForGames_6")[0].getElementsByTagName("span")[1],P=document.getElementsByClassName("pointsForGames_6")[0].getElementsByTagName("span")[2],C=document.getElementsByClassName("pointsForGames_8")[0].getElementsByTagName("span")[0],N=document.getElementsByClassName("pointsForGames_8")[0].getElementsByTagName("span")[1],y=document.getElementsByClassName("pointsForGames_8")[0].getElementsByTagName("span")[2],B=document.getElementsByClassName("pointsForGames_10")[0].getElementsByTagName("span")[0],b=document.getElementsByClassName("pointsForGames_10")[0].getElementsByTagName("span")[1],S=document.getElementsByClassName("pointsForGames_10")[0].getElementsByTagName("span")[2],h=document.getElementsByClassName("pointsForGames_12")[0].getElementsByTagName("span")[0],W=document.getElementsByClassName("pointsForGames_12")[0].getElementsByTagName("span")[1],I=document.getElementsByClassName("pointsForGames_12")[0].getElementsByTagName("span")[2];a(M.value),L(),M.addEventListener("change",function(){e(+M.value)}),E.addEventListener("click",function(){e(+M.value)});var x=!0;g.addEventListener("click",function(e){var n=e.target;x&&(n.classList.contains("containerForCards__cards")&&n.classList.contains("containerForCards__cards_inGame")&&s(n),i())}),g.classList.add("startTimer"),g.addEventListener("click",l),g.addEventListener("click",c),F.addEventListener("click",function(){g.classList.contains("startTimer")||(F.classList.contains("containerWithInformations__btn_pause")?(F.classList.add("containerWithInformations__btn_resume"),F.classList.remove("containerWithInformations__btn_pause"),F.innerHTML="возобновить",clearInterval(T),g.classList.add("containerForCards_disabled")):F.classList.contains("containerWithInformations__btn_resume")&&(F.classList.add("containerWithInformations__btn_pause"),F.classList.remove("containerWithInformations__btn_resume"),F.innerHTML="пауза",T=setInterval(function(){p.innerHTML=G++},1e3),g.classList.contains("containerForCards_disabled")&&g.classList.remove("containerForCards_disabled")))})};