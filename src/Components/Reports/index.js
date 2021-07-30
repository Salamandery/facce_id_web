import React from 'react';

// import styled from "@react-pdf/styled-components";

import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

import Logo from './logo.png';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 1,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  headerAddres: {
    fontSize: 8,
    color: '#333',
  },
  logo1: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRight: 1,
    width: '90px',
    height: '40px',
  },
  logo2: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderLeft: 1,
    width: '90px',
    height: '40px',
  },
  headerInfo: {
    fontSize: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBottom: {
    padding: 3,
    borderTopWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentTitle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  documentSubtitle: {
    fontSize: 8,
    color: '#333',
  },
  page: {
    paddingTop: 50,
    paddingBottom: 65,
    paddingHorizontal: 45,
  },
  section: {
    paddingLeft: 10,
    marginBottom: 20,
    flex: 1,
    alignSelf: 'stretch',
  },
  text: {
    textIndent: 30,
    marginBottom: 10,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  pageNumber: {
    fontSize: 8,
    textAlign: 'center',
    color: '#666',
    position: 'absolute',
    bottom: -30,
  },
});

const MyDocument = ({ text, title, subtitle }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <View style={styles.headerTop}>
          <View style={styles.logo1}>
            <Image src={Logo} />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>NOME DA EMPRESA</Text>
            <Text style={styles.headerAddres}>ENDEREÇO</Text>
          </View>
          <View style={styles.logo2}>
            <Image src={Logo} />
          </View>
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.documentTitle}>{title}</Text>
          <Text style={styles.documentSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>{text}</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Página: ${pageNumber} / ${totalPages}`}
          fixed
        />
      </View>
    </Page>
  </Document>
);

export default function ReportDefault({ text, title, subtitle }) {
  return (
    <PDFViewer style={{ width: '100%', height: '100%' }}>
      <MyDocument text={text} title={title} subtitle={subtitle} />
    </PDFViewer>
  );
}
