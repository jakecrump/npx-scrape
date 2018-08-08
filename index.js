#!/usr/bin/env node

const fs = require('fs')
const request = require('request')
const inquirer = require('inquirer')
const cheerio = require('cheerio')


const questions = [
	{
		type:'input',
		name:'url',
		message: "Enter url to scrape"
	},
	{
		type:'input',
		name:'tag',
		message:"What html tag, class or ID do you want?"
	},
	{
		type:'list',
		name:'info',
		message:'What kind of data do you want?',
		choices:[
			'html',
			'text',
			'href',
			'src',
			'class',
			'id'
		]
	},
	{
		type:'list',
		name:'save',
		message:'Would you like to save the results to your desktop?',
		choices:[
			'yes',
			'no'
		]
	}
]

let scrapeData = []
const answering = (answers)=>{

	let url = answers.url;
	if (!url.match('http')){
		url = 'http://'+answers.url

	}

	request(url, (err, res, body)=>{
		if (err){
			console.log('Something went wrong. Sure you have a valid url?')
		}
		const $ = cheerio.load(body);
		$(answers.tag).each((i, obj)=>{
			switch (answers.info){
				case 'html':
					// console.log($.html(obj))
					scrapeData.push({'html':$.html(obj)})
					break;
				case 'text':
					// console.log($(obj).text())
					scrapeData.push({'text':$(obj).text()})
					break;
				case 'href':
					scrapeData.push({'href':$(obj).attr('href')})
					break;
				case 'src':
					scrapeData.push({'src':$(obj).attr('src')})
					break;
				case 'class':
					scrapeData.push({'class':$(obj).attr('class')})
					break;
				case 'id':
					scrapeData.push({'id':$(obj).attr('id')})
					break;
			}
		})

		if (answers.save){
			fs.writeFileSync(`${answers.tag}-${answers.info}.json`, JSON.stringify(scrapeData, null, 2))
		}
		console.log(JSON.stringify(scrapeData, null, 2))	
		
	})
}


inquirer.prompt(questions)
  .then(answers => {
  	answering(answers)
  });




