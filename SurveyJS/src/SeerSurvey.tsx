/* eslint-disable no-debugger */
/* eslint-disable no-irregular-whitespace */
import { useState, useEffect } from 'react';
import * as React from 'react'
import 'survey-core/defaultV2.min.css';
import {Survey } from 'survey-react-ui'
import { Model, MatrixDropdownRowModelBase } from 'survey-core';

import './app.css'

declare global {
    interface Window {
      showJustificationPopup: (event: Event, rowId: string ) => void;
    }
  }

type JustificationType = {
    [key: string]: string;
}

const SeerJSON = {
    "title": "Business Value Assessment",
    "logo": "data:image/png;base64,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",
    "logoPosition": "right",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "text",
        "name": "question2",
        "startWithNewLine": false,
        "title": "Name"
       },
       {
        "type": "text",
        "name": "question3",
        "startWithNewLine": false,
        "title": "Company Name"
       },
       {
        "type": "text",
        "name": "question6",
        "title": "Annual Turnover"
       },
       {
        "type": "text",
        "name": "question1",
        "startWithNewLine": false,
        "title": "Industry"
       },
       {
        "type": "text",
        "name": "question7",
        "title": "Number of Employees"
       },
       {
        "type": "text",
        "name": "question8",
        "startWithNewLine": false,
        "title": "Number of divisions or legal entities"
       },
       {
        "type": "dropdown",
        "name": "Currency",
        "isRequired": true,
        "choices": [
         "USD - United States dollar",
         "GBP - Pound sterling",
         "EUR - Euro",
         "CAD - Canadian dollar",
         "AUD - Australian dollar",
         "NZD - New Zealand dollar",
         "ZAR - South African rand",
         "AED - UAE dirham",
         "AFN - Afghan afghani",
         "ALL - Albanian lek",
         "AMD - Armenian dram",
         "ANG - Netherlands Antillean guilder",
         "AOA - Angolan kwanza",
         "ARS - Argentine peso",
         "AWG - Aruban florin",
         "AZN - Azerbaijan manat",
         "BAM - Bosnia and Herzegovina convertible mark",
         "BBD - Barbadian dollar",
         "BDT - Bangladeshi taka",
         "BGN - Bulgarian lev",
         "BHD - Bahraini dinar",
         "BIF - Burundi franc",
         "BMD - Bermudian dollar",
         "BND - Brunei dollar",
         "BOB - Bolivian boliviano",
         "BRL - Brazilian real",
         "BSD - Bahamian dollar",
         "BTN - Bhutanese ngultrum",
         "BWP - Botswana pula",
         "BYN - Belarusian ruble",
         "BZD - Belize dollar",
         "CDF - Congolese franc",
         "CHF - Swiss franc",
         "CLP - Chilean peso",
         "CNY - Chinese Yuan Renminbi",
         "COP - Colombian peso",
         "CRC - Costa Rican colon",
         "CUP - Cuban peso",
         "CVE - Cabo Verdean escudo",
         "CZK - Czech koruna",
         "DJF - Djiboutian franc",
         "DKK - Danish krone",
         "DOP - Dominican peso",
         "DZD - Algerian dinar",
         "EGP - Egyptian pound",
         "ERN - Eritrean nakfa",
         "ETB - Ethiopian birr",
         "FJD - Fijian dollar",
         "FKP - Falkland Islands pound",
         "GEL - Georgian lari",
         "GGP - Guernsey Pound",
         "GHS - Ghanaian cedi",
         "GIP - Gibraltar pound",
         "GMD - Gambian dalasi",
         "GNF - Guinean franc",
         "GTQ - Guatemalan quetzal",
         "GYD - Guyanese dollar",
         "HKD - Hong Kong dollar",
         "HNL - Honduran lempira",
         "HTG - Haitian gourde",
         "HUF - Hungarian forint",
         "IDR - Indonesian rupiah",
         "ILS - Israeli new shekel",
         "IMP - Manx pound",
         "INR - Indian rupee",
         "IQD - Iraqi dinar",
         "IRR - Iranian rial",
         "ISK - Icelandic krona",
         "JEP - Jersey pound",
         "JMD - Jamaican dollar",
         "JOD - Jordanian dinar",
         "JPY - Japanese yen",
         "KES - Kenyan shilling",
         "KGS - Kyrgyzstani som",
         "KHR - Cambodian riel",
         "KMF - Comorian franc",
         "KPW - North Korean won",
         "KRW - South Korean won",
         "KWD - Kuwaiti dinar",
         "KYD - Cayman Islands dollar",
         "KZT - Kazakhstani tenge",
         "LAK - Lao kip",
         "LBP - Lebanese pound",
         "LKR - Sri Lankan rupee",
         "LRD - Liberian dollar",
         "LSL - Lesotho loti",
         "LYD - Libyan dinar",
         "MAD - Moroccan dirham",
         "MDL - Moldovan leu",
         "MGA - Malagasy ariary",
         "MKD - Macedonian denar",
         "MMK - Myanmar kyat",
         "MNT - Mongolian tugrik",
         "MOP - Macanese pataca",
         "MRU - Mauritanian ouguiya",
         "MUR - Mauritian rupee",
         "MVR - Maldivian rufiyaa",
         "MWK - Malawian kwacha",
         "MXN - Mexican peso",
         "MYR - Malaysian ringgit",
         "MZN - Mozambican metical",
         "NAD - Namibian dollar",
         "NGN - Nigerian naira",
         "NIO - Nicaraguan cordoba",
         "NOK - Norwegian krone",
         "NPR - Nepalese rupee",
         "OMR - Omani rial",
         "PEN - Peruvian sol",
         "PGK - Papua New Guinean kina",
         "PHP - Philippine peso",
         "PKR - Pakistani rupee",
         "PLN - Polish zloty",
         "PYG - Paraguayan guarani",
         "QAR - Qatari riyal",
         "RON - Romanian leu",
         "RSD - Serbian dinar",
         "RUB - Russian ruble",
         "RWF - Rwandan franc",
         "SAR - Saudi Arabian riyal",
         "SBD - Solomon Islands dollar",
         "SCR - Seychellois rupee",
         "SDG - Sudanese pound",
         "SEK - Swedish krona",
         "SGD - Singapore dollar",
         "SHP - Saint Helena pound",
         "SLE - Sierra Leonean leone",
         "SOS - Somali shilling",
         "SRD - Surinamese dollar",
         "SSP - South Sudanese pound",
         "STN - Sao Tome and Principe dobra",
         "SYP - Syrian pound",
         "SZL - Swazi lilangeni",
         "THB - Thai baht",
         "TJS - Tajikistani somoni",
         "TMT - Turkmen manat",
         "TND - Tunisian dinar",
         "TOP - Tongan pa’anga",
         "TRY - Turkish lira",
         "TTD - Trinidad and Tobago dollar",
         "TWD - New Taiwan dollar",
         "TZS - Tanzanian shilling",
         "UAH - Ukrainian hryvnia",
         "UGX - Ugandan shilling",
         "UYU - Uruguayan peso",
         "UZS - Uzbekistani som",
         "VES - Venezuelan bolivar",
         "VND - Vietnamese dong",
         "VUV - Vanuatu vatu",
         "WST - Samoan tala",
         "XAF - Central African CFA franc",
         "XCD - East Caribbean dollar",
         "XDR - SDR (Special Drawing Right)",
         "XOF - West African CFA franc",
         "XPF - CFP franc",
         "YER - Yemeni rial",
         "ZMW - Zambian kwacha"
        ]
       },
       {
        "type": "boolean",
        "name": "ShowYears",
        "startWithNewLine": false,
        "title": "Show Years?",
        "defaultValue": "false",
        "isRequired": true
       }
      ],
      "title": "Background",
      "description": "About your business"
     },
     {
      "name": "page2",
      "elements": [
       {
        "type": "matrixdropdown",
        "name": "Order to Cash",
        "columns": [
         {
          "name": "Annual Cost",
          "cellType": "text",
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "1000",
          "inputType": "decimal",
         },
         {
          "name": "Improvement(%)",
          "cellType": "text",
          "defaultValueExpression": "10",
          "inputType": "decimal"
         },
         {
          "name": "Saving",
          "cellType": "text",
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "",
          "inputType": "decimal"
         },
         {
          "name": "Year 1",
          "cellType": "text",
          "defaultValueExpression": "",
          "inputType": "decimal"
         },
         {
          "name": "Year 2",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "",
          "inputType": "decimal"
         },
         {
          "name": "Year 3",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "",
          "inputType": "decimal"
         },
         {
          "name": "Year 4",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "",
          "inputType": "decimal"
         },
         {
          "name": "Year 5",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "",
          "inputType": "decimal"
         },
         {
          "name": "Total",
          "cellType": "text",
          "readOnly": true,
          "totalDisplayStyle": "currency",
          "inputType": "decimal"
         },
         {
          "name": "Justification",
          "cellType": "html",
         },
         {
          "name": "Hidden Layer",
          "cellType": "text",
          "visible": false,
          "readOnly": true,
         }
        ],
        "choices": [
         1,
         2,
         3,
         4,
         5
        ],
        "rows": [
         "Sales Order Return",
         "Sales order creation",
         "Lost orders",
         "Uncontrolled Discounts",
         {
            "value": "TotalCalculation",
            "text": "   ",
          }
        ]
       },
       {
        "type": "matrixdropdown",
        "name": "HireToRetire",
        "title": "Hire to Retire",
        "columns": [
         {
          "name": "Annual Cost",
          "cellType": "text",
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "1000",
          "inputType": "decimal"
         },
         {
          "name": "Improvement(%)",
          "cellType": "text",
          "defaultValueExpression": "10",
          "inputType": "decimal"
         },
         {
          "name": "Saving",
          "cellType": "text",
          "defaultValueExpression": "{row.Annual Cost}*{row.Improvement(%)}/100",
          "inputType": "decimal"
         },
         {
          "name": "Year 1",
          "cellType": "text",
          "defaultValueExpression": "{row.Saving}",
          "inputType": "decimal"
         },
         {
          "name": "Year 2",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})"
         },
         {
          "name": "Year 3",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})"
         },
         {
          "name": "Year 4",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})",
          "inputType": "decimal"
         },
         {
          "name": "Year 5",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})",
          "inputType": "decimal"
         },
         {
          "name": "Total",
          "cellType": "text",
          "readOnly": true,
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "{row.Year 1} + {row.Year 2} + {row.Year 3} + {row.Year 4} + {row.Year 5}",
          "inputType": "decimal"
         }
        ],
        "choices": [
         1,
         2,
         3,
         4,
         5
        ],
        "rows": [
         {
          "value": "EmployeeOnboarding",
          "text": "Employee Onboarding cost"
         },
         {
          "value": "EmployeeRecruitment",
          "text": "Employee Recruitment Cost"
         },
         {
          "value": "Payroll",
          "text": "Payroll run costs"
         },
         {
          "value": "Training",
          "text": "Training expense"
         },
         {
            "value": "TotalCalculation",
            "text": "   ",
          }
        ]
       },
       {
        "type": "matrixdropdown",
        "name": "ProcureToPay",
        "title": "Procurement to Pay",
        "columns": [
         {
          "name": "Annual Cost",
          "cellType": "text",
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "1000",
          "inputType": "decimal"
         },
         {
          "name": "Improvement(%)",
          "cellType": "text",
          "defaultValueExpression": "10",
          "inputType": "decimal"
         },
         {
          "name": "Saving",
          "cellType": "text",
          "defaultValueExpression": "",
          "inputType": "decimal"
         },
         {
          "name": "Year 1",
          "cellType": "text",
          "defaultValueExpression": "{row.Saving}",
          "inputType": "decimal"
         },
         {
          "name": "Year 2",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})"
         },
         {
          "name": "Year 3",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})"
         },
         {
          "name": "Year 4",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})",
          "inputType": "decimal"
         },
         {
          "name": "Year 5",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})",
          "inputType": "decimal"
         },
         {
          "name": "Total",
          "cellType": "text",
          "readOnly": true,
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "{row.Year 1} + {row.Year 2} + {row.Year 3} + {row.Year 4} + {row.Year 5}",
          "inputType": "decimal"
         }
        ],
        "choices": [
         1,
         2,
         3,
         4,
         5
        ],
        "rows": [
         {
          "value": "PurchaseOrderReturn",
          "text": "Purchase Order Return"
         },
         {
          "value": "Purchaseordercreation",
          "text": "Purchase order creation"
         },
         {
          "value": "PurchaseApproval",
          "text": "Purchase Order Approvals"
         },
         {
          "value": "UnclaimedDiscounts",
          "text": "Unclaimed discounts"
         },
         {
            "value": "TotalCalculation",
            "text": "   ",
         }
        ]
       },
       {
        "type": "matrixdropdown",
        "name": "RecordToReport",
        "title": "Record to report",
        "columns": [
         {
          "name": "Annual Cost",
          "cellType": "text",
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "1000",
          "inputMask": "decimal"
         },
         {
          "name": "Improvement(%)",
          "cellType": "text",
          "defaultValueExpression": "10",
          "inputType": "decimal"
         },
         {
          "name": "Saving",
          "cellType": "text",
          "defaultValueExpression": "",
          "inputType": "decimal"
         },
         {
          "name": "Year 1",
          "cellType": "text",
          "defaultValueExpression": "{row.Saving}",
          "inputType": "decimal"
         },
         {
          "name": "Year 2",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})"
         },
         {
          "name": "Year 3",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})"
         },
         {
          "name": "Year 4",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})",
          "inputType": "decimal"
         },
         {
          "name": "Year 5",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})",
          "inputType": "decimal"
         },
         {
          "name": "Total",
          "cellType": "text",
          "readOnly": true,
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "{row.Year 1} + {row.Year 2} + {row.Year 3} + {row.Year 4} + {row.Year 5}",
          "inputType": "decimal"
         }
        ],
        "choices": [
         1,
         2,
         3,
         4,
         5
        ],
        "rows": [
         {
          "value": "PeriodClose",
          "text": "Cost of closing financial periods"
         },
         {
          "value": "YearClose",
          "text": "Cost of closing financial years"
         },
         {
          "value": "BankRec",
          "text": "Cost of reconciling bank accounts"
         },
         {
          "value": "Headcount",
          "text": "Head count reduction"
         },
         {
            "value": "TotalCalculation",
            "text": "   ",
          }
        ]
       }
      ],
      "title": "Cost reduction",
      "description": "Please enter cost reductions you envisage as part of this project"
     },
     {
      "name": "page3",
      "elements": [
       {
        "type": "matrixdropdown",
        "name": "RevenueIncrease",
        "title": "Revenue Increases",
        "columns": [
         {
          "name": "Annual Cost",
          "title": "Annual Revenue",
          "cellType": "text",
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "1000",
          "inputType": "number"
         },
         {
          "name": "Improvement(%)",
          "cellType": "text",
          "defaultValueExpression": "10",
          "inputType": "number"
         },
         {
          "name": "Saving",
          "cellType": "text",
          "defaultValueExpression": "{row.Annual Cost}*{row.Improvement(%)}/100",
          "inputType": "number"
         },
         {
          "name": "Year 1",
          "cellType": "text",
          "defaultValueExpression": "{row.Saving}",
          "inputType": "number"
         },
         {
          "name": "Year 2",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})"
         },
         {
          "name": "Year 3",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})"
         },
         {
          "name": "Year 4",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})",
          "inputType": "number"
         },
         {
          "name": "Year 5",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "defaultValueExpression": "iif({ShowYears} = false, '0', {row.Saving})",
          "inputType": "number"
         },
         {
          "name": "Total",
          "cellType": "text",
          "readOnly": true,
          "totalType": "sum",
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "{row.Year 1} + {row.Year 2} + {row.Year 3} + {row.Year 4} + {row.Year 5}",
          "inputType": "number"
         }
        ],
        "choices": [
         1,
         2,
         3,
         4,
         5
        ],
        "rows": [
         {
          "value": "AdditionalSales",
          "text": "Additional sales revenue"
         },
         {
          "value": "AdditionalServices",
          "text": "Additional services revenue"
         }
        ]
       }
      ],
      "title": "Revenue increases",
      "description": "Please describe any revenue increases you envisage as part of this project"
     },
     {
      "name": "page4",
      "elements": [
       {
        "type": "matrixdropdown",
        "name": "ProjectCosts",
        "title": "Project related costs",
        "columns": [
         {
          "name": "Year 1",
          "cellType": "text",
          "inputType": "number"
         },
         {
          "name": "Year 2",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true"
         },
         {
          "name": "Year 3",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true"
         },
         {
          "name": "Year 4",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "inputType": "number"
         },
         {
          "name": "Year 5",
          "cellType": "text",
          "visibleIf": "{ShowYears} = true",
          "inputType": "number"
         },
         {
          "name": "Total",
          "cellType": "text",
          "readOnly": true,
          "totalDisplayStyle": "currency",
          "defaultValueExpression": "{row.Year 1} + {row.Year 2} + {row.Year 3} + {row.Year 4} + {row.Year 5}",
          "inputType": "number"
         }
        ],
        "choices": [
         1,
         2,
         3,
         4,
         5
        ],
        "rows": [
         {
          "value": "LicensingCosts",
          "text": "Licensing costs"
         },
         {
          "value": "ExternalConsultancy",
          "text": "External consultancy"
         },
         {
          "value": "InternalEmployees",
          "text": "Internal employee cost"
         },
         {
          "value": "Hardware",
          "text": "Hardware costs"
         },
         {
          "value": "CloudComputing",
          "text": "Cloud computing costs"
         }
        ]
       }
      ],
      "title": "Project Costs",
      "description": "List any project costs you will incur as a result of this project"
     },
     {
      "name": "page5",
      "elements": [
       {
        "type": "text",
        "name": "TotalCostReduction",
        "title": "Total Cost reduction",
        "defaultValueExpression": "{Order to Cash.Lost orders.Total} +\n{Order to Cash.Sales Order Return.Total}+\n{Order to Cash.Sales Order Creation.Total}+\n{Order to Cash.Uncontrolled Discounts.Total}+\n{HireToRetire.EmployeeOnboarding.Total}+\n{HireToRetire.EmployeeRecruitment.Total}+\n{HireToRetire.Payroll.Total}+\n{HireToRetire.Training.Total}+\n{ProcureToPay.PurchaseOrderReturn.Total}+\n{ProcureToPay.Purchaseordercreation.Total}+\n{ProcureToPay.PurchaseApproval.Total}+\n{ProcureToPay.UnclaimedDiscounts.Total}+\n{RecordToReport.PeriodClose.Total}+\n{RecordToReport.YearClose.Total}+\n{RecordToReport.BankRec.Total}+\n{RecordToReport.Headcount.Total}",
        "readOnly": true,
        "inputType": "number"
       },
       {
        "type": "text",
        "name": "TotalRevenue",
        "startWithNewLine": false,
        "title": "Total Revenue Increases",
        "defaultValueExpression": "{RevenueIncrease.Additionalsales.Total} +\n{RevenueIncrease.Additionalservices.Total}\n",
        "readOnly": true
       },
       {
        "type": "text",
        "name": "TotalProjCost",
        "title": "Total Project Costs",
        "defaultValueExpression": "{ProjectCosts.LicensingCosts.Total}+\n{ProjectCosts.ExternalConsultancy.Total}+\n{ProjectCosts.InternalEmployees.Total}+\n{ProjectCosts.Hardware.Total}+\n{ProjectCosts.CloudComputing.Total}",
        "readOnly": true
       },
       {
        "type": "text",
        "name": "ROI",
        "title": "Return on Investment",
        "defaultValueExpression": "100* ({TotalRevenue} + {TotalcostReduction})/{TotalProjCost}",
        "readOnly": true
       }
      ],
      "title": "Summary"
     }
    ],
    "showProgressBar": "top",
    "firstPageIsStarted": true
   }

const survey = new Model(SeerJSON);


survey.onMatrixCellCreated.add(function (survey, options :any) {
    //Setting up the Justification Column along with the button 
    // if (options.column.name === "Justification") {
    //     const rowId = options.row.id; 
    //     options.cellQuestion.html = `<button type='button' onclick='showJustificationPopup(event, "${rowId}");'>Add</button>`;
    // }
    //Calling function to set the hidden layer values
    if (options.column.name === "Hidden Layer") {
        const rowId = options.row.id;
        let customText = getCustomTextForRow(rowId);
        options.cellQuestion.value = customText;
    }
    //Setting the Hidden Layer Values 
    function getCustomTextForRow(rowId: any) {
        let customText = '';
        switch (rowId) {
            case 'srow_5': customText = 'Hidden Text 4'; break;
            case 'srow_4': customText = 'Hidden Text 3'; break;
            case 'srow_3': customText = 'Hidden Text 2'; break;
            case 'srow_2': customText = 'Hidden Text 1'; break;
            case 'srow_6': customText = 'Total'; break;
            default: customText = 'Unknown'; break;
        }
        return customText;
    }
    //On cell Create to format the Default values of the Annual Cost
    if (options.column.name === "Annual Cost" && options.cellQuestion) {
        //Passes a string
        options.cellQuestion.value = formatNumberWithCommas(options.cellQuestion.value);
        // console.log("Set Value", options.cellQuestion.value)
    }
    //Setting the values for the Hover Over 
     if (options.column.name !== "Hidden Layer") {
        let customText = getCustomTextForRow(options.row.id);
        options.cellQuestion.title = customText; 
    }
    //Calling the Function Update the Total along with commas when showyears is true
    if (options.column.name === "Saving" || options.column.name === "ShowYears") {
        updateYearValuesAndTotal(survey, options.row);
    }
    //Hiding the Unwanted cells in the Total Calculation Row
    if (options.row.name === "TotalCalculation") {
        // Add a class to the row's HTML element if available
        const htmlElement = options.row.htmlElement;
        if (htmlElement) {
            htmlElement.classList.add("hide-total-calculation-row");
        }

        options.row.cells.forEach((cell: { column: { name: string; }; question: { cssClasses: { root: string; }; }; }) => {
            if (cell.column.name !== "Total") {
                cell.question.cssClasses.root = "hide-cell";
            }
        });
    }
});

survey.onMatrixCellValueChanged.add(function (survey, options) {
    //Set Value for Saving Column when Annual Cost Changes
    if (options.column.name === "Annual Cost" || options.column.name === "Improvement(%)") {
        let annualCost = options.row.getQuestionByName("Annual Cost").value;
        let improvement = options.row.getQuestionByName("Improvement(%)").value;

        let annualCostValue = parseFloat(annualCost.toString().replace(/,/g, ''));
        let improvementValue = parseFloat(improvement.toString().replace(/,/g, ''));

        if (!isNaN(annualCostValue) && !isNaN(improvementValue)) {
            let savingValue = annualCostValue * improvementValue / 100;
            let formattedSaving = formatNumberWithCommas(savingValue);
            let formattedAnnualCost = formatNumberWithCommas(annualCost);

            options.row.getQuestionByName("Saving").value = formattedSaving;
            options.row.getQuestionByName("Annual Cost").value = formattedAnnualCost;
        }

        

    }
    //Setting up the value when the Saving Value changes
    if(options.column.name === "Saving") {
        let saving = options.row.getQuestionByName("Saving").value;

        options.row.getQuestionByName("Year 1").value = saving;
        options.row.getQuestionByName("Saving").value = formatNumberWithCommas(saving);

    }
    //Calling the Function Update the Total along with commas when showyears is true
    if (options.column.name === "Saving" || options.column.name === "ShowYears") {
        updateYearValuesAndTotal(survey, options.row);
    }
    //Calling Total Calculation for the 4 matrix dropdown questions 
    if (options.column.name === "Total"){
        caluculateTotalWithCommas(survey)
        caluculateTotalWithCommasHire(survey)
        caluculateTotalWithCommasPay(survey)
        caluculateTotalWithCommasReport(survey)
    }
})
//Total for the Rows 
function updateYearValuesAndTotal(survey: Model, row: MatrixDropdownRowModelBase) {
    let showYears = survey.getValue("ShowYears");
    let savingValue = row.getQuestionByName("Saving").value;
   
    let saving = 0;
    if (savingValue && typeof savingValue === "string") {
        saving = parseFloat(savingValue.replace(/,/g, '')) || 0;
    }
    
    if (showYears === true) {
        for (let year = 2; year <= 5; year++) {
            row.getQuestionByName("Year " + year).value = formatNumberWithCommas(saving);
        }
    }
    
    let total = 0;
    for (let year = 1; year <= (showYears ? 5 : 1); year++) {
        let yearValue = row.getQuestionByName("Year " + year).value;

        if (yearValue && typeof yearValue === "string") {
            yearValue = yearValue.replace(/,/g, '');
        }
        let yearNumber = parseFloat(yearValue) || 0;

        total += yearNumber;
        // console.log(total)      
    }
    row.getQuestionByName("Total").value = formatNumberWithCommas(total);
}
//Foramting with comma
function formatNumberWithCommas(number: number | null | undefined) {
    if (number !== undefined && number !== null) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return number;
}
//Calculate the total for Total column in Order to cash
function caluculateTotalWithCommas(survey: Model) {
    const orderToCashMatrix = survey.getQuestionByName("Order to Cash");
    if (!orderToCashMatrix) return;
    let sum = 0;
    orderToCashMatrix.visibleRows.forEach((row: { name: string; getQuestionByName: (arg0: string) => any; }) => {
        if (["Sales Order Return", "Sales order creation", "Lost orders", "Uncontrolled Discounts"].includes(row.name)) {
            const totalQuestion = row.getQuestionByName("Total");
            if (totalQuestion) {
                let totalValue = totalQuestion.value;
                if (totalValue && typeof totalValue === "string") {
                    sum += parseFloat(totalValue.replace(/,/g, '')) || 0;
                }
            }
        }
    });

    const formattedSum = "$" + formatNumberWithCommas(sum);

    // Find the TotalCalculation row and set its value
    const totalCalcRow = orderToCashMatrix.visibleRows.find((row: { name: string; }) => row.name === "TotalCalculation");
    if (totalCalcRow) {
        const totalCalcQuestion = totalCalcRow.getQuestionByName("Total");
        if (totalCalcQuestion) {
            totalCalcQuestion.value = formattedSum;
        }
    }
}
//Calculate the total for Total Column in Hire to Retire
function caluculateTotalWithCommasHire(survey: Model) {
    const hireToRetireMatrix = survey.getQuestionByName("HireToRetire");
    if (!hireToRetireMatrix) return;
    let sum = 0;
    hireToRetireMatrix.visibleRows.forEach((row: { name: string; getQuestionByName: (arg0: string) => any; }) => {
        if (["EmployeeOnboarding", "EmployeeRecruitment", "Payroll", "Training"].includes(row.name)) {
            const totalQuestion = row.getQuestionByName("Total");
            if (totalQuestion) {
                let totalValue = totalQuestion.value;
                if (totalValue && typeof totalValue === "string") {
                    sum += parseFloat(totalValue.replace(/,/g, '')) || 0;
                }
            }
        }
    });

    const formattedSum = "$" + formatNumberWithCommas(sum);

    // Find the TotalCalculation row and set its value
    const totalCalcRow = hireToRetireMatrix.visibleRows.find((row: { name: string; }) => row.name === "TotalCalculation");
    if (totalCalcRow) {
        const totalCalcQuestion = totalCalcRow.getQuestionByName("Total");
        if (totalCalcQuestion) {
            totalCalcQuestion.value = formattedSum;
        }
    }
}
//Calculate the total for Total Column in Procurement Pay
function caluculateTotalWithCommasPay(survey: Model) {
    const procureToPayMatrix = survey.getQuestionByName("ProcureToPay");
    if (!procureToPayMatrix) return;
    let sum = 0;
    procureToPayMatrix.visibleRows.forEach((row: { name: string; getQuestionByName: (arg0: string) => any; }) => {
        if (["PurchaseOrderReturn", "Purchaseordercreation", "PurchaseApproval", "UnclaimedDiscounts"].includes(row.name)) {
            const totalQuestion = row.getQuestionByName("Total");
            if (totalQuestion) {
                let totalValue = totalQuestion.value;
                if (totalValue && typeof totalValue === "string") {
                    sum += parseFloat(totalValue.replace(/,/g, '')) || 0;
                }
            }
        }
    });

    const formattedSum = "$" + formatNumberWithCommas(sum);

    // Find the TotalCalculation row and set its value
    const totalCalcRow = procureToPayMatrix.visibleRows.find((row: { name: string; }) => row.name === "TotalCalculation");
    if (totalCalcRow) {
        const totalCalcQuestion = totalCalcRow.getQuestionByName("Total");
        if (totalCalcQuestion) {
            totalCalcQuestion.value = formattedSum;
        }
    }
}
//Calculate the total for Total Column in Record to report
function caluculateTotalWithCommasReport(survey: Model) {
    const recorToReportMatrix = survey.getQuestionByName("RecordToReport");
    if (!recorToReportMatrix) return;
    let sum = 0;
    recorToReportMatrix.visibleRows.forEach((row: { name: string; getQuestionByName: (arg0: string) => any; }) => {
        if (["PeriodClose", "YearClose", "BankRec", "Headcount"].includes(row.name)) {
            const totalQuestion = row.getQuestionByName("Total");
            if (totalQuestion) {
                let totalValue = totalQuestion.value;
                if (totalValue && typeof totalValue === "string") {
                    sum += parseFloat(totalValue.replace(/,/g, '')) || 0;
                }
            }
        }
    });

    const formattedSum = "$" + formatNumberWithCommas(sum);

    // Find the TotalCalculation row and set its value
    const totalCalcRow = recorToReportMatrix.visibleRows.find((row: { name: string; }) => row.name === "TotalCalculation");
    if (totalCalcRow) {
        const totalCalcQuestion = totalCalcRow.getQuestionByName("Total");
        if (totalCalcQuestion) {
            totalCalcQuestion.value = formattedSum;
        }
    }
}


function SeerSurvey() {
       const [showModal, setShowModal] = useState(false);
       const [justificationText, setJustificationText] = useState('');
       const [justifications, setJustifications] = useState<JustificationType>({});
       const [activeRowId, setActiveRowId] = useState('');

       //For the button to access the justification state
       survey.onMatrixCellCreated.add(function (survey, options: any) { 
        if (options.column.name === "Justification") {
            const rowId = options.row.id;
            options.cellQuestion.html = getButtonHtml(rowId);
        }
       })

       //Refresh the column when there is a change in the state 
       const refreshSurvey = () => {
        survey.getAllQuestions().forEach(question => {
            if (question.getType() === "matrixdropdown") {
                question.visibleRows.forEach((row: { cells: any[]; id: any; }) => {
                    const cell = row.cells.find((c: { column: { name: string; }; }) => c.column.name === "Justification");
                    if (cell) {
                        const rowId = row.id;
                        cell.question.html = getButtonHtml(rowId);
                    }
                });
            }
        });
        survey.render();
    };

        //Check the condition of the button 
       const getButtonHtml = (rowId: string | number) => {
        const buttonText = justifications[rowId] && justifications[rowId].length > 0 ? "Edit" : "Add";
        return `<button type='button' onclick='showJustificationPopup(event, "${rowId}");'>${buttonText}</button>`;
        };

       //Handle the Justification popup
       const showJustificationPopup = (event: Event, rowId: string) => {
           event.preventDefault();
           const justification = justifications[rowId] || '';
           setJustificationText(justification);
           setActiveRowId(rowId);
           setShowModal(true);
       };
       //Handle save in Justification
       const handleSave = () => {
        const newJustifications = {
            ...justifications,
            [activeRowId]: justificationText
        };
        setJustifications(newJustifications);
        setShowModal(false);
       };
       //Handle cancel in Justification
       const handleCancel = () => {
           setShowModal(false);
       };

       useEffect(() => {
        survey.onMatrixCellValueChanged.add(function (survey, options) {
            if (options.columnName === "Annual Cost" || options.columnName === "Saving") {
                let numericValue = parseFloat(options.value.toString().replace(/,/g, ''));
                if (!isNaN(numericValue)) {
                    options.row.setValue(options.columnName, numericValue);
                }
            }
        });

        survey.onMatrixCellValidate.add(function (survey, options) {
            if (options.columnName === "Annual Cost" || options.columnName === "Saving") {
                options.cellQuestion.value = formatNumberWithCommas(options.value);
            }
        });
    }, [survey]);
   
       useEffect(() => {
           window.showJustificationPopup = showJustificationPopup;
           refreshSurvey();
       }, [justifications]);
   
       return (
           <div>
               <Survey model={survey} />
               {showModal && (
                   <div className="modal-backdrop">
                    <div className='modal'>
                      <div className='modal-header'>
                        <span className='modal-title'>Add Survey</span>
                      </div>
                       <div className='modal-body'>
                           <textarea placeholder='Enter Survey Name'
                               value={justificationText}
                               onChange={(e) => setJustificationText(e.target.value)}
                           />
                       </div>
                       <div className='modal-footer'>
                        <button className="btn btn-cancel mr-10" onClick={handleCancel}>Cancel</button>
                        <button className='btn btn-primary' onClick={handleSave}>Save</button>
                       </div>
                       </div>
                   </div>
               )}
           </div>
       );
   }
   
   export default SeerSurvey;