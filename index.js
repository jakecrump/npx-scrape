#!/usr/bin/env node

const fs = require('fs')
const request = require('request')
const inquirer = require('inquirer')


const questions = [
	{
		type:'input',
		name:'url',
		message: "Enter url to scrape"
	},
	{
		type:'input',
		name:'tag',
		message:"What kind of tag do you want?"
	}
	{
		type:'list',
		name:'save'
		message:'Would you like to save the results to your desktop?',
		choices:[
			'yes',
			'no'
		]
	}

]


const answering = (answers)=>{
	console.log(answers)
}


inquirer.prompt(questions)
  .then(answers => {
  	answering(answers)
  });




