import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RootState, AppDispatch} from '@/store/store'
import {
  fetchSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  toggleForm,
  setEditSkill,
  closeForm,
} from '@/store/skillsSlice'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import styles from './Skills.module.css'
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons'
import Button from '@/components/Button'

export interface Skill {
  id: string
  name: string
  range: number
}

const SkillSchema = Yup.object().shape({
  name: Yup.string().required('Skill name is a required field'),
  range: Yup.number()
    .required('Skill range is a required field')
    .typeError("Skill range must be a 'number' type")
    .min(10, 'Skill range must be greater than or equal to 10')
    .max(100, 'Skill range must be less than или equal to 100'),
})

const Skills: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const skills = useSelector((state: RootState) => state.skills.data)
  const skillsStatus = useSelector((state: RootState) => state.skills.status)
  const isFormOpen = useSelector((state: RootState) => state.skills.isFormOpen)
  const editSkill = useSelector((state: RootState) => state.skills.editSkill)

  useEffect(() => {
    if (skillsStatus === 'idle') {
      dispatch(fetchSkills())
    }
  }, [dispatch, skillsStatus])

  const handleAddSkill = (values: Skill) => {
    dispatch(addSkill(values))
    dispatch(closeForm())
  }

  const handleEditSkill = (values: Skill) => {
    dispatch(updateSkill(values))
    dispatch(closeForm())
  }

  const handleDeleteSkill = (id: string) => {
    dispatch(deleteSkill(id))
    dispatch(closeForm())
  }

  const handleSkillClick = (skill: Skill) => {
    dispatch(setEditSkill(skill))
  }

  const handleToggleForm = () => {
    dispatch(toggleForm())
  }

  return (
    <div className={styles.skillsContainer}>
      <Button
        onClick={handleToggleForm}
        className={styles.editButton}
        icon={isFormOpen ? faTimes : faEdit}
        text={isFormOpen ? 'Close Edit' : 'Open Edit'}
      />
      {(isFormOpen || editSkill) && (
        <Formik
          key={editSkill ? editSkill.id : 'new'}
          initialValues={editSkill || {id: '', name: '', range: 0}}
          validationSchema={SkillSchema}
          validateOnChange={true}
          onSubmit={(values, {resetForm}) => {
            editSkill ? handleEditSkill(values) : handleAddSkill(values)
            resetForm()
          }}
        >
          {({isValid, dirty}) => (
            <Form className={styles.form}>
              <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                  <label htmlFor='name' className={styles.formLabel}>
                    Skill name:
                  </label>
                  <Field
                    id='name'
                    name='name'
                    placeholder='Enter skill name'
                    className={styles.field}
                  />
                </div>
                <ErrorMessage
                  name='name'
                  component='div'
                  className={styles.error}
                />
              </div>
              <div className={styles.formContainer}>
                <div className={styles.formGroup}>
                  <label htmlFor='range' className={styles.formLabel}>
                    Skill range:
                  </label>
                  <Field
                    id='range'
                    name='range'
                    type='number'
                    placeholder='Enter skill range'
                    className={styles.field}
                  />
                </div>
                <ErrorMessage
                  name='range'
                  component='div'
                  className={styles.error}
                />
              </div>

              <div className={styles.formActions}>
                <Button
                  type='submit'
                  disabled={!(isValid && dirty)}
                  className={`${styles.submitButton} ${
                    !(isValid && dirty) ? styles.disabledButton : ''
                  }`}
                  text={editSkill ? 'Edit Skill' : 'Add Skill'}
                />
                {editSkill && (
                  <Button
                    type='button'
                    onClick={() => handleDeleteSkill(editSkill.id)}
                    className={styles.deleteButton}
                    text={'Delete Skill'}
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
      <div data-testid='skill-list' className={styles.skillList}>
        {skills.map((skill) => (
          <div key={skill.id} className={styles.skillItem}>
            <div
              onClick={() => handleSkillClick(skill)}
              className={styles.skillBar}
              style={{width: `${skill.range}%`}}
            >
              {skill.name}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.xAxisContainer}>
        <div className={styles.xAxis}>
          <div className={styles.marker} style={{left: '0%'}}>
            <div className={styles.line}></div>
            <div className={styles.label}>Beginner</div>
          </div>
          <div className={styles.marker} style={{left: '35%'}}>
            <div className={styles.line}></div>
            <div className={styles.label}>Intermediate</div>
          </div>
          <div className={styles.marker} style={{left: '75%'}}>
            <div className={styles.line}></div>
            <div className={styles.label}>Advanced</div>
          </div>
          <div className={styles.marker} style={{left: '100%'}}>
            <div className={styles.line}></div>
            <div className={styles.label}>Expert</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Skills
