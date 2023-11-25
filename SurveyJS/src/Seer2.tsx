/* eslint-disable no-undef */
import * as React from "react";
import 'survey-core/defaultV2.min.css';
import * as Survey from "survey-react-ui";
import { Model } from 'survey-core';

interface SurveyComponentProps {
  // Define any props here if needed
}

interface SurveyComponentState {
  surveyJson: any;
}

class SurveyComponent extends React.Component<SurveyComponentProps, SurveyComponentState> {
  constructor(props: SurveyComponentProps) {
    super(props);
    this.state = {
      surveyJson: {
        title: "Business Value Assessment",
        logoPosition: "right",
        pages: [
          {
            name: "page2",
            elements: [
              {
                type: "matrixdropdown",
                name: "Order to Cash",
                columns: [{ name: "Annual Cost", cellType: "text" }],
                rows: ["Sales Order Return", "Sales Order Creation", "Lost Orders", "Uncontrolled Discounts"],
              },
            ],
            title: "Cost reduction",
            description: "Please enter cost reductions you envisage as part of this project",
          },
        ],
        showProgressBar: "top",
        firstPageIsStarted: true,
      },
    };
  }

  componentDidMount() {
    const survey =new Model(this.state.surveyJson);

    survey.onMatrixCellCreated.add((sender, options) => {
      if (options.columnName === "Annual Cost") {
        switch (options.row.rowName) {
          case "Sales Order Return":
            options.cellQuestion.placeholder = "Custom Text 1";
            break;
          case "Sales Order Creation":
            options.cellQuestion.placeholder = "Custom Text 2";
            break;
          case "Lost Orders":
            options.cellQuestion.placeholder = "Custom Text 3";
            break;
          case "Uncontrolled Discounts":
            options.cellQuestion.placeholder = "Custom Text 4";
            break;
          // Add more cases as needed
        }
      }
    });

    survey.render("surveyElement");
  }

  render() {
    return <div id="surveyElement" />;
  }
}

export default SurveyComponent;
