const {Builder, By, until} = require('selenium-webdriver');
var assert = require('assert'),
    should = require('should'),     
    fs = require('fs'),     
    test = require('selenium-webdriver/testing'),     
    webdriver = require('selenium-webdriver');

var expect = require('expect.js');

	
test.describe('NewYorkDress.com', function() {
    this.timeout(60000);
    var driver;
    test.before(function() {
        //driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
		driver = new webdriver.Builder().forBrowser('firefox').build();
    });

test.it('step 1 - Make call to product page', function() {
    driver.get('http://www.newyorkdress.com/');
	driver.wait(until.titleContains('NewYorkDress.com'), 1000);
    driver.sleep(1000);
  
	//close popup
    driver.findElement(webdriver.By.css("div.ub-emb-iframe-wrapper:nth-child(1) > button:nth-child(1)")).click();
	driver.sleep(2000);
	//click on item - Prom Dresses
	var textPromise = driver.findElement(By.css(".whats-list-box > ul:nth-child(1) > li:nth-child(3) > div:nth-child(1) > a:nth-child(1)")).getAttribute("href");

textPromise.then(function(text) {
  if (text === "http://www.newyorkdress.com/Prom_Dresses.html") {
    console.log("foo1234success");
	console.log(text);
    //process.exit(0);
    return;
  } else {
    console.log("foo1234fail");
	console.log(text);
    process.exit(1);
  }
});
	driver.findElement(webdriver.By.css(".whats-list-box > ul:nth-child(1) > li:nth-child(3) > div:nth-child(1) > a:nth-child(1)")).click();
	driver.sleep(3000);
    driver.wait(until.titleContains('Prom Dresses'), 1000);
    driver.sleep(2000);
});

test.it('step 2 - Make call to reco - model=popular', function() {

	//click on item - Morrell Maxie 15696 Dress
    driver.findElement(webdriver.By.css("#ctl00_ContentPlaceHolder1_dlItems > span:nth-child(9) > li:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a:nth-child(2) > img:nth-child(1)")).click();
	driver.sleep(3000);
    driver.wait(until.titleContains('Dress'), 1000);
    driver.sleep(1000);
	
  	//Get as response 8 recommendations, at least single popular 
	//retrieve the HTML as a string

	driver.findElement(By.css("#vlerecommendations")).getAttribute("outerHTML")
    .then(function(profile) {
		/*Regex count string occurrence in string
		 *var temp = "This is a string.";
		 *var count = (temp.match(/is/g) || []).length;
		 *console.log(count);
		*/
		var count = (profile.match(/medium=rec/g) || []).length;
		//console.log(count);
		//https://github.com/Automattic/expect.js
		expect(count).to.eql('8');
		//Regex to check, if the whole String contains the substring "DEF" at least once ^.*DEF.*$
    	expect(profile).to.contain('medium=rec&amp;model=popular');
		//console.log(profile);
	});

});

test.it('step 3 - online-serving reccomendation - model=popular_(2)', function() {
	driver.findElement(webdriver.By.css("#vlerecommendations > div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)")).click();
	driver.sleep(3000);
    driver.wait(until.titleContains('Dress'), 1000);
    driver.sleep(1000);
	//Get as response 8 recommendations, at least single popular?? 
	driver.findElement(By.css("#vlerecommendations")).getAttribute("outerHTML")
    .then(function(profile) {
		var count = (profile.match(/medium=rec/g) || []).length;
		console.log(count);
		expect(count).to.eql('8');
		expect(profile).to.contain('medium=rec&amp;model=category' || 'medium=rec&amp;model=popular');
		//console.log(profile);
	});

});

test.it('step 4 - online-serving reccomendation - model=category', function() {
	driver.findElement(webdriver.By.css("#vlerecommendations > div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)")).click();
	driver.sleep(3000);
    driver.wait(until.titleContains('Dress'), 1000);
    driver.sleep(1000);
	//Get as response 8 recommendations, at least single category
	driver.findElement(By.css("#vlerecommendations")).getAttribute("outerHTML")
    .then(function(profile) {
		var count = (profile.match(/medium=rec/g) || []).length;
		//console.log(count);
		expect(count).to.eql('8');
    	expect(profile).to.contain('medium=rec&amp;model=category');
		//console.log(profile);
	});

});

test.it('step 5 - online-serving reccomendation - model=isr', function() {
	driver.findElement(webdriver.By.css("#vlerecommendations > div:nth-child(1) > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)")).click();
	driver.sleep(3000);
    driver.wait(until.titleContains('Dress'), 1000);
    driver.sleep(1000);
	driver.findElement(By.css("#vlerecommendations")).getAttribute("outerHTML")
	//Get as response 8 recommendations, at least single isr
    .then(function(profile) {
		var count = (profile.match(/medium=rec/g) || []).length;
		//console.log(count);
		expect(count).to.eql('8');
    	expect(profile).to.contain('medium=rec&amp;model=isr');
		
	});

});
/*
test.after(function () {
    driver.quit();
  });
*/
});
