import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { collection, addDoc } from "firebase/firestore";
import {db} from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {storage} from '../../firebase';
import { v4 as uuidv4 } from 'uuid';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(4, 'Name should be at least 4 characters')
    .max(50, 'Name should not exceed 50 characters'),
  fathersName: yup
    .string()
    .required("Father's name is required")
    .min(4, "Father's name should be at least 4 characters")
    .max(50, "Father's name should not exceed 50 characters"),
  dateOfBirth: yup.date().required('Date of birth is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Invalid phone number'),
  email: yup.string().email('Invalid email').required('Email is required'),
  qualification: yup.string().required('Qualification is required'),
  passportSizePhoto: yup
    .mixed()
    .required('Back picture of driving license is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  pinCode: yup
    .string()
    .required('Pin code is required')
    .matches(/^\d+$/, 'Invalid pin code'),
  state: yup.string().required('State is required'),
  adhaarCardNumber: yup
    .string()
    .required('Aadhaar card number is required')
    .matches(/^\d+$/, 'Invalid Aadhaar card number'),
  district: yup.string().required('District is required'),
  frontAdhaarCard: yup
    .mixed()
    .required('Back picture of driving license is required'),
  backAdhaarCard: yup
    .mixed()
    .required('Back picture of driving license is required'),
  drivingLicenseNumber: yup
    .string()
    .required('Driving license number is required'),
  licenseCategory: yup.string().required('License category is required'),
  licenseIssueDate: yup.date().required('License issue date is required'),
  licenseExpiryDate: yup.date().required('License expiry date is required'),
  issuingAuthority: yup.string().required('Issuing authority is required'),
  frontDrivingLicense: yup
    .mixed()
    .required('Back picture of driving license is required'),
  backDrivingLicense: yup
    .mixed()
    .required('Back picture of driving license is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(50, 'Password should not exceed 50 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  age: yup
    .number()
    .required('Age is required')
    .min(18, 'Age should be at least 18 years')
    .max(60, 'Age should not exceed 60 years'),
  gender: yup
    .string()
    .required("Gender is required")
});

const qualificationOptions = [
  '5th Standard',
  '8th Standard',
  '10th Standard',
  '12th Standard',
  'Graduation',
  'Other',
];

export default function Form() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      qualification: '',
      issuingAuthority: '',
      licenseCategory: '',
    },
  });


  const onSubmit = async (data, e) => {
    console.log("heyy");

    console.log(data.passportSizePhoto);
    console.log(e.target.passportSizePhoto.files[0]);
    console.log(e.target.frontAdhaarCard.files[0]);
    console.log(e.target.backAdhaarCard.files[0]);
    console.log(e.target.frontDrivingLicense.files[0]);
    console.log(e.target.backDrivingLicense.files[0]);

    // set a unique id for each user
    data.id = uuidv4();

    // Upload passport size photo
    try {
      const profilePicRef = ref(storage, `user-images/passport_size_photo/${data.id}`)
      await uploadBytes(profilePicRef, e.target.passportSizePhoto.files[0]).then((snapshot) => {
                console.log(snapshot)
                getDownloadURL(snapshot.ref).then(async(passport_URL) => {
                  console.log(passport_URL)
                  data.passportSizePhoto = passport_URL;
                })
              }).catch((er)=>{
                window.alert("Couldn't upload your passport size photo")
                console.log(er);
              })

      console.log("uploading passport size photo");
    } catch (e) {
      console.error("Error uploading passport size photo: ", e);
    }

    // Upload front picture of aadhaar card
    try {
      const frontAdhaarCardRef = ref(storage, `user-images/front_adhaar_card/${data.id}`)
      await uploadBytes(frontAdhaarCardRef, e.target.frontAdhaarCard.files[0]).then((snapshot) => {
                console.log(snapshot)
                getDownloadURL(snapshot.ref).then(async(front_adhaar_URL) => {
                  console.log(front_adhaar_URL)
                  data.frontAdhaarCard = front_adhaar_URL;
                })
              }).catch((er)=>{
                window.alert("Couldn't upload your front picture of aadhaar card")
                console.log(er);
              })

      console.log("uploading front picture of aadhaar card");
    } catch (e) {
      console.error("Error uploading front picture of aadhaar card: ", e);
    }

    // Upload back picture of aadhaar card
    try {
      const backAdhaarCardRef = ref(storage, `user-images/back_adhaar_card/${data.id}`)
      await uploadBytes(backAdhaarCardRef, e.target.backAdhaarCard.files[0]).then((snapshot) => {
                console.log(snapshot)
                getDownloadURL(snapshot.ref).then(async(back_adhaar_URL) => {
                  console.log(back_adhaar_URL)
                  data.backAdhaarCard = back_adhaar_URL;
                })
              }).catch((er)=>{
                window.alert("Couldn't upload your back picture of aadhaar card")
                console.log(er);
              })

      console.log("uploading back picture of aadhaar card");
    } catch (e) {
      console.error("Error uploading back picture of aadhaar card: ", e);
    }

    // Upload front picture of driving license
    try {
      const frontDrivingLicenseRef = ref(storage, `user-images/front_driving_license/${data.id}`)
      await uploadBytes(frontDrivingLicenseRef, e.target.frontDrivingLicense.files[0]).then((snapshot) => {
                console.log(snapshot)
                getDownloadURL(snapshot.ref).then(async(front_driving_URL) => {
                  console.log(front_driving_URL)
                  data.frontDrivingLicense = front_driving_URL;
                })
              }).catch((er)=>{
                window.alert("Couldn't upload your front picture of driving license")
                console.log(er);
              })
            
      console.log("uploading front picture of driving license");
    } catch (e) {
      console.error("Error uploading front picture of driving license: ", e);
    }

    // Upload back picture of driving license
    try {
      const backDrivingLicenseRef = ref(storage, `user-images/back_driving_license/${data.id}`)
      await uploadBytes(backDrivingLicenseRef, e.target.backDrivingLicense.files[0]).then((snapshot) => {
                console.log(snapshot) 
                getDownloadURL(snapshot.ref).then(async(back_driving_URL) => {
                  console.log(back_driving_URL)
                  data.backDrivingLicense = back_driving_URL;
                })
              }).catch((er)=>{
                window.alert("Couldn't upload your back picture of driving license")
                console.log(er);
              })

      console.log("uploading back picture of driving license");
    } catch (e) {
      console.error("Error uploading back picture of driving license: ", e);
    }

    data.status = "Pending";

    console.log("uploading data to firestore");
    console.log(data);
      
    // Upload data to firestore
    try {
      const docRef = await addDoc(collection(db, "users"), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  };

  return (
    <Container className='my-20'>
      <Box mt={4} mb={2}>
        <Typography variant='h3' align='center' className='my-4'>
          Registration Form
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='name'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Name'
                  placeholder='Enter your name'
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='fathersName'
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Father's Name"
                  placeholder="Enter your father's name"
                  error={!!errors.fathersName}
                  helperText={errors.fathersName?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='dateOfBirth'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Date of Birth'
                  type='date'
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='age'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Age'
                  type='number'
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='gender'
              render={({ field }) => (
                <FormControl error={!!errors.gender} fullWidth>
                  <InputLabel>Select Gender</InputLabel>
                  <Select {...field}>
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                    <MenuItem value='Other'>Other</MenuItem>
                  </Select>
                  {errors.gender && (
                    <Typography color='error' variant='caption'>
                      {errors.gender.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='phoneNumber'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Phone Number'
                  placeholder='Enter your phone number'
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='email'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Email'
                  placeholder='Enter your email'
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='qualification'
              render={({ field }) => (
                <FormControl error={!!errors.qualification} fullWidth>
                  <InputLabel>Qualification</InputLabel>
                  <Select {...field}>
                    {qualificationOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.qualification && (
                    <Typography color='error' variant='caption'>
                      {errors.qualification.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='passportSizePhoto'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Passport Size Photo'
                  type='file'
                  id='passport'
                  error={!!errors.passportSizePhoto}
                  helperText={errors.passportSizePhoto?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='address'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Address'
                  placeholder='Enter your address'
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='city'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='City'
                  placeholder='Enter your city'
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='pinCode'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Pin Code'
                  placeholder='Enter your pin code'
                  error={!!errors.pinCode}
                  helperText={errors.pinCode?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='state'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='State'
                  placeholder='Enter your state'
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='adhaarCardNumber'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Aadhaar Card Number'
                  placeholder='Enter your Aadhaar card number'
                  error={!!errors.adhaarCardNumber}
                  helperText={errors.adhaarCardNumber?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='district'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='District'
                  placeholder='Enter your district'
                  error={!!errors.district}
                  helperText={errors.district?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='frontAdhaarCard'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Front Picture of Aadhaar Card'
                  type='file'
                  id = 'frontAdhaarCard'
                  error={!!errors.frontAdhaarCard}
                  helperText={errors.frontAdhaarCard?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='backAdhaarCard'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Back Picture of Aadhaar Card'
                  type='file'
                  error={!!errors.backAdhaarCard}
                  helperText={errors.backAdhaarCard?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='drivingLicenseNumber'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Driving License Number'
                  placeholder='Enter your driving license number'
                  error={!!errors.drivingLicenseNumber}
                  helperText={errors.drivingLicenseNumber?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='licenseCategory'
              render={({ field }) => (
                <FormControl error={!!errors.licenseCategory} fullWidth>
                  <InputLabel>License Category</InputLabel>
                  <Select {...field}>
                    <MenuItem value='LMV'>LMV</MenuItem>
                    <MenuItem value='HMV'>HMV</MenuItem>
                    <MenuItem value='LTV'>LTV</MenuItem>
                    <MenuItem value='HTV'>HTV</MenuItem>
                  </Select>
                  {errors.licenseCategory && (
                    <Typography color='error' variant='caption'>
                      {errors.licenseCategory.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='licenseIssueDate'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='License Issue Date'
                  type='date'
                  error={!!errors.licenseIssueDate}
                  helperText={errors.licenseIssueDate?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='licenseExpiryDate'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='License Expiry Date'
                  type='date'
                  error={!!errors.licenseExpiryDate}
                  helperText={errors.licenseExpiryDate?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='issuingAuthority'
              render={({ field }) => (
                <FormControl error={!!errors.issuingAuthority} fullWidth>
                  <InputLabel>Issuing Authority</InputLabel>
                  <Select {...field}>
                    <MenuItem value='RTO'>RTO</MenuItem>
                    <MenuItem value='DTO'>DTO</MenuItem>
                    <MenuItem value='SDM'>SDM</MenuItem>
                  </Select>
                  {errors.issuingAuthority && (
                    <Typography color='error' variant='caption'>
                      {errors.issuingAuthority.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='frontDrivingLicense'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Front Picture of Driving License'
                  type='file'
                  error={!!errors.frontDrivingLicense}
                  helperText={errors.frontDrivingLicense?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='backDrivingLicense'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Back Picture of Driving License'
                  type='file'
                  error={!!errors.backDrivingLicense}
                  helperText={errors.backDrivingLicense?.message}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='password'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Password'
                  type='password'
                  placeholder='Enter Password'
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              control={control}
              name='confirmPassword'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Confirm Password'
                  type='password'
                  placeholder='Confirm Password'
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
        <div className='flex justify-center items-center my-10'>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
}
