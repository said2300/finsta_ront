import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBRow,
  MDBView,
} from "mdbreact";

export const Properties = ({ properties }) => (
  <>
    <h2 className="h2-responsive font-weight-bold text center my-4">
      Nos hébergements insolites{" "}
    </h2>
    <MDBRow>
      {properties &&
        properties.map((property) => (
          <MDBCol md="4" lg="4">
            <MDBView zoom>
              <img></img>
            </MDBView>
            <MDBCardBody>
              <MDBCardTitle>{property.title}</MDBCardTitle>
              <MDBCardText>
                <strong>{property.description}</strong>
              </MDBCardText>
            </MDBCardBody>
            <MDBCardBody>
              <MDBCardTitle>{property.title}</MDBCardTitle>
              <MDBCardText>
                <strong>{property.description}</strong>
              </MDBCardText>
            </MDBCardBody>
            <MDBCardBody>
              <MDBCardTitle>{property.title}</MDBCardTitle>
              <MDBCardText>
                <strong>{property.description}</strong>
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
        ))}
    </MDBRow>
  </>
);
