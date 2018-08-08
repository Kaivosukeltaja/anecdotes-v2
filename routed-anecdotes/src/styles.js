const navigationBar = {
  backgroundColor: '#001166',
  color: '#ffffff',
  lineHeight: 1,
  padding: '16px 0',
}

const navigation = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const title = {
  fontWeight: 'bold',
  margin: 0,
}

const notification = {
  border: '2px solid green',
  borderRadius: '4px',
  margin: '0.5em 0',
  padding: '1em',
  color: 'green',
  backgroundColor: '#ccffcc',
}

const link = {
  backgroundColor: '#f0f0f0',
  padding: '1em',
  color: '#333333',
  borderRadius: '4px',
  margin: '0.5em 0.1em',
  boxShadow: 'rgba(0,0,0,0.2) 3px 3px 6px',
  textDecoration: 'none'
}

const linkActive = {
  ...link,
  backgroundColor: '#d0d0d0',
  boxShadow: 'rgba(0,0,0,0.4) 3px 3px 6px',
  fontWeight: 'bold'
}

const ada = {
  maxWidth: '100%'
}

const submitButton = {
  marginTop: '1em',
}

const footer = {
  marginTop: '1em',
  borderTop: '1px solid #f0f0f0',
  color: '#999999',
  padding: '1em 0',
  textAlign: 'center', 
}

export default { notification, link, linkActive, ada, submitButton, footer, navigation, navigationBar, title }
