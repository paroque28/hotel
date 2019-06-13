import React from 'react';
const Landing = () => (
  <div style={styles.container}>
    <h1>Landing</h1>
  </div>
);

export default Landing;


const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    alignSelf: 'center',
    flex: 1,
    height: '45%',
    resizeMode: 'contain',
    width: '45%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  description: {
    color: '#656500',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
}