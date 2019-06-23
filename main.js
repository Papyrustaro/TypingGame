function system(){
  titlename = 'PapyTyping';
  version = 'Ver.1.0';
  timelimit = 60;
}

function wordset(){
  description = new Array();
  question = new Array();
  answer = new Array();

  var descriptionlist = "";
  var questionlist = "";
  var answerlist = "";

  descriptionlist = "人工知能,デジタル情報を記録するメディア,ユーザーインターフェース,認証局運用規程";
  questionlist = "AI,CD,GUI,CPS";
  answerlist = "Artificial Intelligence,Compact Disc,Graphical User Interface,Certification Practice Statement";
  descriptionlist += ",Microsoftが開発するウェブブラウザ,証明書失効リスト,情報セキュリティ問題を専門に扱う組織の総称";
  questionlist += ",IE,CRL,CSIRT";
  answerlist += ",Internet Explorer,Certificate Revocation List,Cyber Security Incident Response Team";
  descriptionlist += ",IPアドレスから対応する機器のMACアドレスを得るプロトコル,公開鍵証明書認証局,データベース";
  questionlist += ",ARP,CA,DB";
  answerlist += ",Address Resolution Protocol,Certification Authority,Data Base";
  descriptionlist += ",人間とマシンを判別するチューリングテスト";
  questionlist += ",CAPTCHA";
  answerlist += ",Completely Automated Public Turing test to tell Computers and Humans Apart";
  descriptionlist += ",本来のサーバーに代わってコンテンツを利用者に配信する仕組み,ウェブサーバー上でユーザープログラムを動作させるための仕組み";
  questionlist += ",CDN,CGI";
  answerlist += ",Content Delivery Network,Common Gateway Interface";
  descriptionlist += ",データフロー図,信頼できないネットワークと信頼できるネットワークの間に置かれるネットワーク領域";
  questionlist += ",DFD,DMZ";
  answerlist += ",Data Flow Diagram,DeMilitarized Zone";
  descriptionlist += ",コンデンサに電荷を蓄えて情報を記憶する半導体メモリ,同期式のDRAM,電気の操作によってデータの消去や書き換えが可能な半導体メモリ";
  questionlist += ",DRAM,SDRAM,EEPROM";
  answerlist += ",Dynamic Random Access Memory,Synchronous Dynamic Random Access Memory,Electrically Erasable Programmable Read-Only Memory";
  descriptionlist += ",ネットワークの安定的かつセキュアな運用の確保に責任を負う非営利団体,インターネットで利用される技術の標準を策定する組織";
  questionlist += ",ICANN,IETF";
  answerlist += ",Internet Corporation for Assigned Names and Numbers,Internet Engineering Task Force";
  descriptionlist += ",「モノ」のインターネット,ID情報を埋め込んだRFタグから電磁界や電波を用いて情報のやり取りを行う技術,公開鍵基盤";
  questionlist += ",IoT,RFID,PKI";
  answerlist += ",Internet of Things,Radio Frequency IDentifier,Public Key Infrastructure";
  descriptionlist += ",SDカードと同じインターフェースで、データの入出力が可能な周辺機器の規格,ソフトウェアによって仮想的なネットワーク環境を作るという考え方";
  questionlist += ",SDIO,SDN";
  answerlist += ",Secure Digital Input/Output,Software Defined Networking";
  descriptionlist += ",SDカードの記憶容量が最大2TBに拡張された規格,インターネットにおいて、メールの送信・転送をするのに用いられるプロトコル";
  questionlist += ",SDXC,SMTP";
  answerlist += ",Secure Digiral eXtended Capacity,Simple Mail Transfer Protocol";
  descriptionlist += ",フリップフロップ等の順路回路を利用した半導体メモリ,Webアプリケーションの攻撃を守るためのセキュリティ対策";
  questionlist += ",SRAM,WAF";
  answerlist += ",Static Random Access Memory,Web Application Firewall";

  description = descriptionlist.split(",");
  question = questionlist.split(",");
  answer = answerlist.split(",");


  answered = new Array(answer.length);
  for(var i = 0; i < answered.length; i++){
    answered[i] = 0;
  }

}

window.onload = function(){
  restart = -1;

  if(navigator.userAgent.indexOf("Chrome") != -1){
    burauza = "Chrome";
  }else if(navigator.userAgent.indexOf("Safari") != -1){
    burauza = "Safari";
  }else if(navigator.appName == "Netscape"){
    burauza = "Net";
  }else if(navigator.appName == "Opera"){
    burauza = "Ope";
  }else{
    burauza = "IE";
  }

  wordset();
  system();
//  getkey(0);
  restart = 0;
  initgamescreen();
  empty();

  document.onkeypress = checkword;
}

function typeend(){
  if(restart == 1){
    clearInterval(jikan);
    restart = 0;
    endflag = 1;
    result();
    emptyend();
  }
  document.getElementById("endbutton").blur();
}

function result(){
  score = speed * 100 + wordcurrect * 2 + percent * 5;

  score = score.toFixed(0);
  speed = speed.toFixed(3);

  document.text.currect.value = currect;
  document.text.uncurrect.value = uncurrect;
  document.text.percent.value = percent;
  document.text.speed.value = speed;
  document.text.score.value = score;
}

function startset(){
  min = 0;
  sec = 0;
  currect = 0;
  wordcurrect = 0;
  uncurrect = 0;
  percent = 0;
  speed = 0;
  score = 0;
  endflag = 0;
  input = "";
  wordplace = 0;
  place = 0;

  shiftdown = 0; //shiftkeyが押されていたら1、押されていなかったら0

  var mintemp;
  var sectemp;

  starttime = new Date();
  jikan = setInterval("count()", 1000);

  mintemp = String(Math.floor(timelimit / 60));
  sectemp = String((timelimit - (mintemp * 60)).toFixed(0));
  if(sectemp.length < 2){
    sectemp = "0" + sectemp;
  }
  if(mintemp.length < 2){
    mintemp = "0" + mintemp;
  }
  document.text.time.value = mintemp + ":" + sectemp;

  document.text.percent.value = "0";
  document.text.speed.value = "0";
  document.text.score.value = "0";
  document.text.currect.value = "0";
  document.text.uncurrect.value = "0";

  typetest();

}

function putpercent(){
  percent = currect / (currect + uncurrect) * 100;
  percent = percent.toFixed(3);
  document.text.percent.value = percent;
}

function count(){
  var currenttime;
  var sectemp;
  var mintemp;
  var remain;

  currenttime = new Date();
  sec = Number(((currenttime - starttime) / 1000).toFixed(0));
  if(sec >= 60){
    starttime = new Date();
    sec = 0;
    min++;
  }
  if(endflag != 1){
    speed = currect / (min * 60 + sec);
    document.text.speed.value = speed.toFixed(3);

    score = speed * 100 + wordcurrect * 2 + percent * 5;
    score = score.toFixed(0);
    document.text.score.value = score;
  }

  remain = timelimit - (min * 60 + sec);
  mintemp = String(Math.floor(remain / 60));
  sectemp = String((timelimit - (mintemp * 60 + sec) - min * 60).toFixed(0));

  if(sectemp.length < 2){
    sectemp = "0" + sectemp;
  }
  if(mintemp.length < 2){
    mintemp = "0" + mintemp;
  }

  document.text.time.value = mintemp + ":" + sectemp;

  if(min * 60 + sec >= timelimit){ //制限時間が来たら終了
    typeend();
  }
}

function empty(mode){
  var mintemp;
  var sectemp;

  if(mode == 0){
    mintemp = String(Math.floor(timelimit / 60));
    sectemp = String((timelimit - (mintemp * 60)).toFixed(0));
    if(sectemp.length < 2){
      sectemp = "0" + sectemp;
    }
    if(mintemp.length < 2){
      mintemp = "0" + mintemp;
    }

    document.text.time.value = mintemp + ":" + sectemp;

    document.getElementById("descriptionfield").innerHTML = "Spaceキーを押すとスタート";
    document.getElementById("questionfield").innerHTML = "ここに略語が表示されます";
    document.getElementById("answerfield").innerHTML = "ここに正式名称が表示されます";
  }else{
    input = "";
    place = 0;
    wordplace = 0;
    document.getElementById("descriptionfield").innerHTML="Spaceキーを押すとスタート";
		document.getElementById("questionfield").innerHTML="";
    document.getElementById("answerfield").innerHTML="";
  }
}

function emptyend(){
  document.getElementById("descriptionfield").innerHTML = "Spaceキーを押すとスタート";
  document.getElementById("questionfield").innerHTML = "終了";
  document.getElementById("answerfield").innerHTML = "";
}

function typetest(){
  var temp = "";
  empty(1);

  putsellect();
  //ro_machange();

  if(burauza == "Net"){
    document.getElementById("descriptionfield").textContent = setumei;
  }else{
    document.getElementById("descriptionfield").innerText = setumei;
  }
  if(burauza=="Net"){
		document.getElementById("questionfield").textContent= mondai;
	}else{
		document.getElementById("questionfield").innerText= mondai;
	}
  var ele=document.getElementById("answerfield");
	var textfont1=document.createElement("font");
	textfont1.setAttribute("color","#aaaaaa");
	if(burauza=="Net"){
		textfont1.textContent=spell;
	}else{
		textfont1.innerText=spell;
	}
	ele.appendChild(textfont1);
}

function putsellect(){ //問題選出関数
  var loop = 0;
  var randomper = 0;;

  do{
    randomper = Math.floor(Math.random() * answer.length);
    loop++;
  }while(answered[randomper] == 1 && loop < answered.length);

  if(loop == answered.length - 1){
    for(var i = 0; i < answered.length; i++){
      answered[i] = 0;
    }
  }

  answered[randomper] = 1;
  spell = answer[randomper];
  mondai = question[randomper]
  setumei = description[randomper];
}

function initgamescreen(){
  restart=0;
  var temp="";

  var tempsoft=document.getElementById("gamescreen");
	tempsoft.innerHTML="";

	var tempdiv1=document.createElement("div");
	tempdiv1.setAttribute("id","softtitle");

  var temptext1_1=document.createTextNode(titlename);

	var tempdiv1_2=document.createElement("div");
	tempdiv1_2.setAttribute("id","softsubtitle");

	var temptext1_2=document.createTextNode(version);

	tempdiv1.appendChild(temptext1_1);
	tempdiv1_2.appendChild(temptext1_2);
	tempsoft.appendChild(tempdiv1);
	tempsoft.appendChild(tempdiv1_2);

	var tempdiv2=document.createElement("div");
	tempdiv2.setAttribute("id","softnaiyou");
	tempsoft.appendChild(tempdiv2);

	var tempdiv3=document.createElement("div");
	tempdiv3.setAttribute("id","softmaingamen");

	tempdiv2.appendChild(tempdiv3);

	var tempform1=document.createElement("form");
	tempform1.setAttribute("name","text");
	tempdiv3.appendChild(tempform1);

	var tempdiv3_1=document.createElement("div");

	tempform1.appendChild(tempdiv3_1);

tempdiv3_1.appendChild(document.createTextNode('残り時間'));
var tempinput3_1=document.createElement("input");
tempinput3_1.setAttribute("type","text");
tempinput3_1.setAttribute("name","time");
tempinput3_1.setAttribute("value","00:00");
tempinput3_1.setAttribute("size","5");
tempinput3_1.setAttribute("onfocus","this.blur()");
tempdiv3_1.appendChild(tempinput3_1);

tempform1.appendChild(document.createElement("br"));

tempform1.appendChild(document.createTextNode('問題'));

var tempdiv4=document.createElement("div");
tempform1.appendChild(tempdiv4);

var temptable4=document.createElement("table");
temptable4.setAttribute("id","textfield");

tempdiv4.appendChild(temptable4);


var temptr4_1=document.createElement("tr");		//1行目
temptable4.appendChild(temptr4_1);

var temptd4_1=document.createElement("td");
temptd4_1.setAttribute("id","descriptionfield");
temptr4_1.appendChild(temptd4_1);


var temptr4_2=document.createElement("tr");		//2行目
temptable4.appendChild(temptr4_2);

var temptd4_2=document.createElement("td");
temptd4_2.setAttribute("id","questionfield");
temptr4_2.appendChild(temptd4_2);

var temptr4_3=document.createElement("tr");		//3行目
temptable4.appendChild(temptr4_3);

var temptd4_3=document.createElement("td");
temptd4_3.setAttribute("id","answerfield");
temptr4_3.appendChild(temptd4_3);


var tempinput4=document.createElement("input");
tempinput4.setAttribute("type","button");
tempinput4.setAttribute("id","endbutton");
tempinput4.setAttribute("value","タイピングを終わる");
tempinput4.setAttribute("onclick","typeend()");

tempdiv4.appendChild(tempinput4);


var tempmainresult=document.createElement("div");
tempmainresult.setAttribute("id","mainresult");
tempform1.appendChild(tempmainresult);

var temptext5_1=document.createTextNode('正解数：');
tempmainresult.appendChild(temptext5_1);
var tempinput5_1=document.createElement("input");
tempinput5_1.setAttribute("type","text");
tempinput5_1.setAttribute("name","currect");
tempinput5_1.setAttribute("value","0");
tempinput5_1.setAttribute("size","15");
tempinput5_1.setAttribute("onfocus","this.blur()");
tempmainresult.appendChild(tempinput5_1);
tempmainresult.appendChild(document.createElement("br"));

var temptext5_2=document.createTextNode('失敗数：');
tempmainresult.appendChild(temptext5_2);
var tempinput5_2=document.createElement("input");
tempinput5_2.setAttribute("type","text");
tempinput5_2.setAttribute("name","uncurrect");
tempinput5_2.setAttribute("value","0");
tempinput5_2.setAttribute("size","15");
tempinput5_2.setAttribute("onfocus","this.blur()");
tempmainresult.appendChild(tempinput5_2);
tempmainresult.appendChild(document.createElement("br"));

var temptext5_3=document.createTextNode('正解率(%)：');
tempmainresult.appendChild(temptext5_3);
var tempinput5_3=document.createElement("input");
tempinput5_3.setAttribute("type","text");
tempinput5_3.setAttribute("name","percent");
tempinput5_3.setAttribute("value","0");
tempinput5_3.setAttribute("size","15");
tempinput5_3.setAttribute("onfocus","this.blur()");
tempmainresult.appendChild(tempinput5_3);
tempmainresult.appendChild(document.createElement("br"));

var temptext5_4=document.createTextNode('速度(タイプ/秒)：');
tempmainresult.appendChild(temptext5_4);
var tempinput5_4=document.createElement("input");
tempinput5_4.setAttribute("type","text");
tempinput5_4.setAttribute("name","speed");
tempinput5_4.setAttribute("value","0");
tempinput5_4.setAttribute("size","15");
tempinput5_4.setAttribute("onfocus","this.blur()");
tempmainresult.appendChild(tempinput5_4);
tempmainresult.appendChild(document.createElement("br"));

var temptext5_5=document.createTextNode('得点：');
tempmainresult.appendChild(temptext5_5);
var tempinput5_5=document.createElement("input");
tempinput5_5.setAttribute("type","text");
tempinput5_5.setAttribute("name","score");
tempinput5_5.setAttribute("value","0");
tempinput5_5.setAttribute("size","15");
tempinput5_5.setAttribute("onfocus","this.blur()");
tempmainresult.appendChild(tempinput5_5);
tempmainresult.appendChild(document.createElement("br"));

//buttonchange("title");
empty(0);
window.focus();
}

function currectf(){
  if(endflag != 1){
    var temp = "";
    var temp2 = "";
    currect++;

    document.text.currect.value = currect;
    putpercent();

    input += spell[wordplace].charAt(place);

    var ele = document.getElementById("answerfield");
    ele.innerHTML = "";
    var textfont1 = document.createElement("font");
    textfont1.setAttribute("style","color: 000000");
    ele.appendChild(textfont1);

    if(burauza == "Net"){
      textfont1.textContent = input;
    }else{
      textfont1.innerText = input;
    }

    var textfont2 = document.createElement("font");
    textfont2.setAttribute("style","color: #aaaaaa");
    ele.appendChild(textfont2);
    if(burauza == "Net"){
      textfont2.textContent = spell.substring(input.length, spell.length);
    }else{
      textfont2.innerText = spell.substring(input.length, spell.length);
    }

    place++;
    if(place >= spell[wordplace].length){
      wordcurrect += spell[wordplace].length;
      wordplace++;
      place = 0;
    }
    if(wordplace >= spell.length){
      typetest();
    }
  }
}

function uncurrectf(moji){
  if(endflag != 1){
    var temp = "";
    uncurrect++;
    document.text.uncurrect.value = uncurrect;
    putpercent();

    var ele = document.getElementById("answerfield");
    ele.innerHTML = "";
    var textfont1 = document.createElement("font");
    textfont1.setAttribute("style","color: #000000");
    ele.appendChild(textfont1);
    var textfont2 = document.createElement("font");
    textfont2.setAttribute("style","color: #ff0000");
    ele.appendChild(textfont2);
    var textfont3 = document.createElement("font");
    textfont3.setAttribute("style","color: #aaaaaa");
    ele.appendChild(textfont3);
    if(burauza == "Net"){
      textfont1.textContent=input;
      textfont2.textContent=spell.charAt(input.length);
      textfont3.textContent=spell.substring(input.length+1,spell.length);
    }else{
      textfont1.innerText=input;
      textfont2.innerText=spell.charAt(input.length);
      textfont3.innerText=spell.substring(input.length+1,spell.length);
    }
  }
}

function checkshift(e){
	if(burauza=="IE" || burauza=="Ope" || burauza=="Safari" || burauza=="Chrome"){
		if(event.keyCode==16){
			shiftdown=0;
		}
	}else{
		if(e.which==16){
			shiftdown=0;
		}
	}
}

function checkword(e){
  if(burauza=="IE" || burauza=="Ope" || burauza=="Safari" || burauza=="Chrome"){
			if(restart==0 && event.keyCode==32){
				restart=1;
				startset();
		//	}else if(restart==0 && event.keyCode!=32){
			}else if(restart==1){
				if(String.fromCharCode(event.keyCode)==spell[wordplace].charAt(place)){
					currectf();
				}else{
					uncurrectf(String.fromCharCode(event.keyCode));
				}
			}
		}else{
			if(restart==0 && e.which==32){
				restart=1;
				startset();
			}else if(restart==0 && e.which!=32){
			}else if(restart==1){
				if(String.fromCharCode(e.which)==spell[wordplace].charAt(place)){
					currectf();
				}else{
					uncurrectf(String.fromCharCode(e.which));
				}
			}
		}
}

function notevent(e){ //キー入力で発生するブラウザ処理をキャンセル
  var keychi;
	if(burauza=="Net"){
		keychi=e.which;
		if(keychi==32){
			return false;
		}else if(keychi=='\''.charCodeAt()){
			return false;
		}else if(keychi=='('.charCodeAt()){
			return false;
		}else if(keychi=='/'.charCodeAt()){
			return false;
		}else if(keychi==13){
			return false;
		}else{
			return true;
		}
	}else if(burauza=="Ope"){
		keychi=event.keyCode;
		if(keychi==32){
			return false;
		}else if(keychi=='\''.charCodeAt()){
			return false;
		}else if(keychi=='('.charCodeAt()){
			return false;
		}else if(keychi=='-'.charCodeAt()){
			return false;
		}else if(keychi==','.charCodeAt()){
			return false;
		}else if(keychi=='.'.charCodeAt()){
			return false;
		}else if(keychi=='/'.charCodeAt()){
			return false;
		}else if(keychi==';'.charCodeAt()){
			return false;
		}else if(keychi==13){
			return false;
		}else{
			return true;
		}

	}else{
		keychi=event.keyCode;
		if(keychi==32){
			return false;
		}else if(keychi=='\''.charCodeAt()){
			return false;
		}else if(keychi=='('.charCodeAt()){
			return false;
		}else if(keychi==13){
			return false;
		}else{
			return true;
		}
	}
}

function tweetfc(){
  alert(a);
  var tweet = document.getElementById("twitter-widget-0");
  tweet.setAttribute("data-text", "てすと");
};
