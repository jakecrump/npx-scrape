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
		message:"What kind of html tag do you want?"
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


const answering = (answers)=>{
	request(answers.url, (err, res, body)=>{
		const $ = cheerio.load(body);
		$(answers.tag).each((i, obj)=>{
			switch (answers.info){
				case 'html':
					console.log($.html(obj))
					break;
				case 'text':
					console.log($(obj).text())
					break;
				case 'href':
					console.log($(obj).attr('href'))
					break;
				case 'src':
					console.log($(obj).attr('src'))
					break;
				case 'class':
					console.log($(obj).attr('class'))
					break;
				case 'id':
					console.log($(obj).attr('id'))
					break;
			}
		})
	})
}


inquirer.prompt(questions)
  .then(answers => {
  	answering(answers)
  });




