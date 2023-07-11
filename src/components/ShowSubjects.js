import React from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSubjectsList, changeCategory } from "../actions";
import { categoriesList } from "../consts";
const ShowSubjects = (props) => {
  const { fetchSubjectsList, changeCategory, subjects, categorySelected } =
    props;
  //choose the first category automaticaly
  useEffect(() => {
    changeCategory(categoriesList[0].key);
  }, [changeCategory]);

  //change subjects list
  useEffect(() => {
    if (categorySelected) {
      fetchSubjectsList(categorySelected);
    }
  }, [fetchSubjectsList, categorySelected]);

  const renderCategories = (categoriesList) => {
    return categoriesList.map((category) => {
      return (
        <button
          key={category.key}
          className={`ui button ${
            categorySelected && category.key === categorySelected
              ? "active"
              : ""
          }`}
          onClick={() => {
            changeCategory(category.key);
          }}
        >
          {category.name}
        </button>
      );
    });
  };

  const renderSubjectsList = () => {
    if (!subjects) {
      return <div>Loading...</div>;
    } else {
      return subjects.data.map((subject) => {
        return (
          <div className="item" key={subject.id}>
            <i className="large middle aligned icon bookmark" />
            <div className="content">
              <Link
                to={`/rankingi/${subject.attributes.parentId}/${subject.id}`}
                className="header"
              >
                {subject.attributes.name}
              </Link>
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className="ui container">
      <h2>Kategorie</h2>
      <div className="ui list" style={{ marginBottom: "10px" }}>
        {renderCategories(categoriesList)}
      </div>
      <div className="ui horizontal divider">Tematy rankingów</div>

      <div className="ui celled list">{renderSubjectsList()}</div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    subjects: state.bdl.subjects,
    categorySelected: state.bdl.categorySelected,
  };
};
export default connect(mapStateToProps, { fetchSubjectsList, changeCategory })(
  ShowSubjects
);
