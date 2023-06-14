//PROBLEM: po przejściu na inną stronę, nie wczytuje się automatycznie nowy zestaw danych. Próbowałam to rozwiązać stosując useEffect i pisząc action unselect, ale do ustawienia jest kolejności poszczególnych operacji.

import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSubjectsList,
  fetchVariablesList,
  fetchData,
  selectVariable,
  selectYear,
  cleanup
} from "../actions";

import ShowData from "./ShowData";

const ShowVariables = (props) => {
   //extracts id from route:
  let { subjectId } = useParams();
  let { categoryId} = useParams();

  let {
    fetchSubjectsList,
    fetchVariablesList,
    fetchData,
    selectYear,
    selectVariable,
    cleanup,
    subjects,
    variables,
    variableSelected,
    yearSelected,
  } = props;
 
  //initial render
 useEffect(() => {
    fetchSubjectsList(categoryId);
    fetchVariablesList(subjectId);
    return () => {
      cleanup();
  }
  }, [subjectId, categoryId, fetchSubjectsList, fetchVariablesList, cleanup ]);

  //auto selecting first variable from the list and first year from the list after rendering the component
  useEffect(() => {
    if (variableSelected === undefined) {
      if (!variables) return;
      selectVariable(variables[0].id);
    } else if (variableSelected && yearSelected === undefined) {
      selectYear(variableSelected.attributes.years[0]);
    }
  }, [variableSelected, yearSelected, variables, selectVariable, selectYear]);

  //fetch data after each change of variable selected or yearSelected
  useEffect(() => {
    if (!variableSelected || variableSelected===undefined || !yearSelected || yearSelected===undefined ) return;
    else fetchData(variableSelected.id, yearSelected);
  }, [variableSelected, yearSelected, fetchData]);

  const renderTitle = () => {
    if (!subjects) return <div className="header">Loading...</div>
    else {
      //find the subject we are currently watching
      const activeSubject = subjects.data.find((x) => x.id === subjectId);
      return (
        <h1 className="header">
          {activeSubject.attributes.name} w {yearSelected} roku
        </h1>
      );
    }
  };

  //render variables buttons:
  const renderVariables = () => {
    if (!variables) return <div>Loading...</div>;
    else {
      return variables.map((variable) => {
        return (
          <button
            onClick={() => props.selectVariable(variable.id)}
            key={variable.id}
            className={`ui button ${variableSelected && variable.id===variableSelected.id ? 'active' : ''}`}
            style={{"marginBottom" : "0.5rem"}}
          >
            {variable.attributes.n1} {variable.attributes.n2 ? `- ${variable.attributes.n2}` : null}
         
          </button>
        );
      });
    }
  };

  const renderYears = () => {
    if (!variableSelected) return <div>Wybierz zmienną...</div>;
    else {
      const years = variableSelected.attributes.years;
      //render years list
      return years.map((year, index) => {
        return (
          <div 
            key={index}
            onClick={() => props.selectYear(year)}
            className={`ui inverted secondary button ${yearSelected && year===yearSelected ? 'active' : ''}`}
          >
            {year}
          </div>
        );
      });
    }
  };

  return (
    <div className="ui container">
      {renderTitle()}
      <div className="ui grid" style={{"marginBottom": "10px"}}> {renderVariables()}</div>
      <div className="ui grid " style={{"marginBottom": "10px"}}>{renderYears()}</div>
      
      <ShowData/>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    categorySelected: state.bdl.categorySelected,
    subjects: state.bdl.subjects,
    variables: state.bdl.variables,
    variableSelected: state.bdl.variableSelected,
    yearSelected: state.bdl.yearSelected,
  };
};
export default connect(mapStateToProps, {
  fetchSubjectsList,
  fetchVariablesList,
  fetchData,
  selectVariable,
  selectYear,
  cleanup,
})(ShowVariables);
