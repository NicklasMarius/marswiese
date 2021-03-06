import React, { useState, useEffect } from 'react';
// @material-ui core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
//import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
// own components
import MarsLoader from 'myComponents/MarsLoader/MarsLoader';
import { DivWithParallaxPaper } from '../../myComponents/withParallaxPaper';
import ValidatedTextField from '../../myComponents/ValidatedTextField.component';
// API utils
import { getCoursesByCategory } from '../../APIUtils';
import { justDate } from '../../DateUtils';

// styles
import basicsStyle from 'assets/jss/material-kit-pro-react/views/componentsSections/basicsStyle.js';
import MainPageStyle from 'assets/jss/material-kit-pro-react/myViews/mainPageStyle.js';
import sectionPillsStyle from 'assets/jss/material-kit-pro-react/views/blogPostsSections/sectionPillsStyle.js';
import CoursesPageStyle from './CoursesPageStyles';

const useBasicStyles = makeStyles(basicsStyle);
const useMainPageStyles = makeStyles(MainPageStyle);
const useSectionPillsStyles = makeStyles(sectionPillsStyle);
const useCoursesPageStyles = makeStyles(CoursesPageStyle);


const CoursesPage = (props) => {
    // styles
    const basicClasses = useBasicStyles();
    const mainPageClasses = useMainPageStyles();
    const sectionPillsClasses = useSectionPillsStyles();
    const CoursesPageClasses = useCoursesPageStyles();

    // state
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState({});
    const [fieldState, setFieldState] = useState({age: "", startDate: null, endDate: null, categoryLabels: []});
    const [chips, setChips] = useState([]);
    const [filterState, setFilterState] = useState({})

    // ON MOUNT
    useEffect(() => {
        (async () => {
        try {
            setIsLoading(true);
            const response = await getCoursesByCategory();
            // save only categories that actually have courses
            setCategories(response.filter(cat => cat.courses.length > 0));
            setIsLoading(false);
        } catch {}
        })();
    }, []);
  
    useEffect(() => {
      (async () => {
        try {
          setFilterState({
            categories: categories
          });
      } catch {}
      })();
    }, [categories]);
  
    // create chips when state variable "filterState" changes
    useEffect(() => {
      (async () => {
        try {
          createChips();
      } catch {}
      })();
    }, [filterState]);

    // update "fieldState" when "filterState" changes
    useEffect(() => {
      (async () => {
        try {
          console.log("filter state set to:", filterState);
          setFieldState({
            ...fieldState,
            categoryLabels: filterState.categories.map(cat => cat.label)
          });
      } catch {}
      })();
    }, [filterState]);

    useEffect(() => {
      (async () => {
        try {
          console.log("field state changed to: ", fieldState);
      } catch {}
      })();
    }, [fieldState]);

    const handleMultipleSelect = event => {
        setFieldState({...fieldState, categoryLabels: event.target.value});
    };
    
    const handleStartDateChange = newDate => {
        const date = new Date(newDate);
        date.setHours(0, 0, 0, 0);
        setFieldState({...fieldState, startDate: date});
    };
    
    const handleEndDateChange = newDate => {
        const date = new Date(newDate);
        date.setHours(0, 0, 0, 0);
        setFieldState({...fieldState, endDate: date});
    };

    // apply filter to courses with selected options
  const applyFilter = () => {
    // filter courses by selected categories
    var newFilterState = {
      categories: categories.filter(cat => fieldState.categoryLabels.includes(cat.label))
    };

    // filter courses by selected age range
    if (fieldState.age != "") {
      newFilterState = {
        ...newFilterState,
        categories: newFilterState.categories.map(category => {
          return {
            ...category,
            courses: category.courses.filter(
              course =>
                course.minAge <= fieldState.age && course.maxAge >= fieldState.age
            )
          };
        })
      };
    }
    
    if (fieldState.startDate !== null && fieldState.endDate != null) {
      newFilterState = {
        ...newFilterState,
        categories: newFilterState.categories.filter(cat => cat.courses.filter(
          course =>
            new Date(course.timeUnits[0].startDate) >=
            new Date(fieldState.startDate) &&
            new Date(
              course.timeUnits[course.timeUnits.length - 1].endDate
            ) <= new Date(fieldState.endDate)
        ))
      };
    }
    
    setFilterState(newFilterState);
    };

    // create chips array
    const createChips = () => {
      var newChips = [];

      filterState.categories.map(cat => newChips.push({ key: cat.label, label: cat.label }));
        
      if (fieldState.age !== "") {
        newChips.push({
          key: 'age',
          label: fieldState.age + ' Jahre'
        });
      }

      if (fieldState.startDate !== null) {
        newChips.push({
          key: 'startDate',
          label: 'ab ' + justDate(fieldState.startDate)
        });
      }

      if (fieldState.endDate !== null) {
        newChips.push({
          key: 'endDate',
          label: 'bis ' + justDate(fieldState.endDate)
        });
      }
      
      setChips(newChips);
    };

    const handleDeleteChip = key => {
      // remove chip with key "key" from array
        switch (key) {
          case 'age':
            setFilterState({...filterState, age: ""});
            break;
          case 'startDate':
            setFilterState({...filterState, startDate: null});
            break;
          case 'endDate':
            setFilterState({...filterState, endDate: null});
            break;
          default:
            setFilterState({...filterState, categories: filterState.categories.filter(cat => cat.label !== key)});
            break;
        }
  };

    return (
    <DivWithParallaxPaper
      title="Kurse"
      image="https://www.marswiese.at/wordpress/wp-content/uploads/Banner3.jpg"
    >
      <div className={mainPageClasses.container}>
        <div className={sectionPillsClasses.section}>
          {(() => {
            if (isLoading) {
              return (
                <GridContainer justify="center">
                  <MarsLoader />
                </GridContainer>
              );
            } else {
              return (
                <div className={mainPageClasses.container}>
                  <div className={CoursesPageClasses.filterSection}>
                    <Grid id="main-container" container spacing={10}>
                      <Grid id="left-column" container item lg={6} xs={12} direction="column">
                          {/* CATEGORY SELECT */}
                          <Grid item>
                            <Typography id="category-select-label" gutterBottom>
                              Kategorie
                            </Typography>
                            <Select
                              multiple
                              fullWidth
                              value={fieldState.categoryLabels}
                              onChange={handleMultipleSelect}
                              MenuProps={{
                                className: basicClasses.selectMenu,
                                classes: { paper: basicClasses.selectPaper }
                              }}
                              classes={{ select: basicClasses.select }}
                              inputProps={{
                                name: 'multipleSelect',
                                id: 'multiple-select'
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: basicClasses.selectMenuItem
                                }}
                              >
                                Mehrfachauswahl
                              </MenuItem>

                              {categories.map(cat =>
                                  <MenuItem
                                    classes={{
                                      root: basicClasses.selectMenuItem,
                                      selected:
                                        basicClasses.selectMenuItemSelectedMultiple
                                    }}
                                    key={cat.label}
                                    value={cat.label}
                                  >
                                    {cat.label}
                                  </MenuItem>
                              )}
                            </Select>
                          </Grid>

                          {/* AGE INPUT FIELD */}
                          <Grid item>
                            <ValidatedTextField
                              id="age"
                              type="number"
                              name="age"
                              label="Alter des Teilnehmers"
                              value={fieldState.age}
                              fullWidth
                              parentCallback={() => {}}
                              handleChange={e => setFieldState({
                                ...fieldState,
                                age: e.target.value
                              })}
                              validators={[]}
                            />
                          </Grid>

                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid id="third-row" container item>
                              {/* START DATE*/}
                              <Grid item lg={6} xs={12}>
                                <Typography
                                  id="courses-start-date-label"
                                  gutterBottom
                                >
                                  Kurse vom
                                </Typography>
                                <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  margin="normal"
                                  id="courses-start-date-picker"
                                  value={fieldState.startDate}
                                  onChange={handleStartDateChange}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                  }}
                                />
                            </Grid>
                            
                              {/* END DATE*/}
                              <Grid item lg={6} xs={12}>
                                <Typography
                                  id="courses-end-date-label"
                                  gutterBottom
                                >
                                  Kurse bis
                                </Typography>
                                <KeyboardDatePicker
                                  disableToolbar
                                  variant="inline"
                                  format="dd/MM/yyyy"
                                  margin="normal"
                                  id="courses-end-date-picker"
                                  value={fieldState.endDate}
                                  onChange={handleEndDateChange}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </MuiPickersUtilsProvider>
                      </Grid>

                      <Grid container item direction="column" lg={6} xs={12} justify="center" alignItems="center">
                          {/* APPLY FILTER BUTTON*/}
                          <Grid item>
                            <Button color="primary" onClick={applyFilter}>
                              Filter anwenden
                            </Button>
                          </Grid>

                          {/* CLEAR FILTER BUTTON*/}
                          <Grid item>
                          <Button onClick={() => setFilterState({ categories: categories })}>
                              Filter zurücksetzen
                            </Button>
                          </Grid>
                      </Grid>
                    </Grid>
                  </div>

                  {/* CHIPS FOR SET FILTERS */}
                  {chips.map(chip => (
                    <Chip
                      key={chip.key}
                      label={chip.label}
                      color="primary"
                      onDelete={() => {
                        handleDeleteChip(chip.key);
                      }}
                    />
                  ))}

                  <Grid container spacing={2}>
                    {filterState.categories.map(category => {
                      return (
                        <React.Fragment key={category._id}>
                          {/* display title only when there are actually courses */}
                          {category.courses.length > 0 && (
                            <h3>{category.label}</h3>
                          )}
                          <Grid container spacing={2}>
                            {category.courses.map(course => {
                              return (
                                <Grid
                                  item
                                  key={course._id}
                                  xs={12}
                                  sm={6}
                                  md={3}
                                >
                                  <Card
                                    small
                                    onClick={() =>
                                      props.history.push('/Kurs/' + course._id)
                                    }
                                    raised
                                    background
                                    style={{
                                      backgroundImage:
                                        "url('https://www.marswiese.at/wordpress/wp-content/uploads/boulderbereich.jpg')"
                                    }}
                                  >
                                    <CardBody background>
                                      <h3>{course.courseName}</h3>
                                      <h5>ab {course.minAge} Jahren</h5>
                                    </CardBody>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </React.Fragment>
                      );
                    })}
                  </Grid>
                </div>
              );
            }
          })()}
        </div>
      </div>
    </DivWithParallaxPaper>
  );
}

export default CoursesPage