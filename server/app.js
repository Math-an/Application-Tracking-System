const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let applicationData = [];
let hireData = [];

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const Email = "r.mathan2404@gmail.com";
    const Password = "Mathan@06";
    if (email === Email && password === Password) {

        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
});

app.post('/fillapplication', (req, res) => {
    const formData = req.body;
    console.log('Received application data:', formData);
    applicationData.push(formData);
    res.json({ success: true });
});

app.get('/applications', (req, res) => {
    try {
        console.log(applicationData);

        if (!Array.isArray(applicationData)) {
            console.error('Invalid format in applicationData. Expected an array.');
            return res.status(500).json({ error: 'Invalid format in applicationData' });
        }
        res.json(applicationData);
    } catch (error) {
        console.error('Error retrieving application data:', error);
        res.status(500).json({ error: 'Failed to retrieve application data' });
    }
});

app.get('/hires', (req, res) => {
  try {
      console.log(hireData);

      if (!Array.isArray(hireData)) {
          console.error('Invalid format in applicationData. Expected an array.');
          return res.status(500).json({ error: 'Invalid format in applicationData' });
      }
      res.json(hireData);
  } catch (error) {
      console.error('Error retrieving application data:', error);
      res.status(500).json({ error: 'Failed to retrieve application data' });
  }
});


app.post('/hire', (req, res) => {
  const jobId = req.body.id;

  const jobIndex = applicationData.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
      const jobToHire = applicationData[jobIndex];
      applicationData.splice(jobIndex, 1);
      hireData.push(jobToHire);
      console.log('Hired job:', jobToHire);
      console.log('Updated applicationData:', applicationData);
      console.log('Updated hireData:', hireData);

      res.json({ success: true, message: 'Job hired successfully' });
  } else {
      console.error('Job not found:', jobId);
      res.status(404).json({ success: false, error: 'Job not found' });
  }
});


app.get('/hiredjobs', (req, res) => {
  try {
    res.json(hireData);
  } catch (error) {
    console.error('Error retrieving hired jobs:', error);
    res.status(500).json({ error: 'Failed to retrieve hired jobs' });
  }
});

app.delete('/reject/:jobId', (req, res) => {
  const jobId = req.params.jobId;
  const jobIndex = applicationData.findIndex(job => job.id === jobId);

  if (jobIndex !== -1) {
      applicationData.splice(jobIndex, 1);
      console.log('Rejected job:', jobId);
      console.log('Updated applicationData:', applicationData);

      res.json({ success: true, message: 'Job rejected successfully' });
  } else {
      console.error('Job not found:', jobId);
      res.status(404).json({ success: false, error: 'Job not found' });
  }
});


app.get('/viewapplication/:id', (req, res) => {
  const jobId = req.params.id;
  const job = applicationData.find(job => job.id === jobId);

  if (job) {
    res.json(job);
  } else {
    console.error('Job not found:', jobId);
    res.status(404).json({ success: false, error: 'Job not found' });
  }
});




app.put("/edit", (req, res) => {
  try {
    const id = req.body.id;
    const updatedFormData = req.body.formData; 
    const index = applicationData.findIndex(item => item.id === id);
    if (index !== -1) {
      applicationData[index] = { ...applicationData[index], ...updatedFormData };
      console.log('Updated application data:', applicationData);
      res.json({ success: true, message: 'Application data updated successfully' });
    } else {  
      console.error('Application not found:', id);
      res.status(404).json({ success: false, error: 'Application not found' });
    }
  } catch (err) {
    console.error('Error updating application data:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
