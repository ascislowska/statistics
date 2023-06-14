import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions";

const ShowData = (props) => {
  let { variableSelected, bdlData } = props;

  const renderMeasureUnit = (unit) => {
    switch (unit) {
      case "-":
        return null;
      case "osoba":
        return " os.";
      case "tys. osób":
        return " tys. osób";
      default:
        return unit;
    }
  };

  const renderData = () => {
    //waiting for data fetching
    if (!bdlData || !variableSelected) return <div>Loading...</div>;
    //case of empty data sets
    if (bdlData.data.length === 0)
      return (
        <div className="ui header">
          Brak danych. Wybierz inny rok lub zmienną.
        </div>
      );
    //standard case - rendering data
    else {
      //extract data
      const dataExtracted = bdlData.data.map((region) => {
        return {
          key: region.id,
          name: region.attributes.name,
          value: region.attributes.values[0].val,
        };
      });
      //sort data
      const dataSorted = dataExtracted.sort(function (a, b) {
        return a.value > b.value ? -1 : b.value > a.value ? 1 : 0;
      });
      //render data
      return dataSorted.map((region, index) => {
        return (
          <div key={region.key} className="item very relaxed">
            <div className="ui grid">
              <div className="two wide column ">
                <span className="ui teal large circular label">
                  {index + 1}{" "}
                </span>
              </div>
              <div className=" fourteen wide column ">
                <h4 className="header"> {region.name}</h4>

                <div className="">
                  {region.value.toLocaleString()}{" "}
                  {renderMeasureUnit(
                    variableSelected.attributes.measureUnitName
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
  };

  return <div className="ui celled relaxed list">{renderData()}</div>;
};
const mapStateToProps = (state) => {
  return {
    bdlData: state.bdl.data,
    variableSelected: state.bdl.variableSelected,
    yearSelected: state.bdl.yearSelected,
  };
};
export default connect(mapStateToProps, {
  fetchData,
})(ShowData);
