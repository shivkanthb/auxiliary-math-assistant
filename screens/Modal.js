import React from "react";
import { StatusBar, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import MathJax from "react-native-mathjax";

const content = `<div id="Root">
<queryresult success="true" error="false" xml:space="preserve" numpods="4" datatypes="" timedout="" timedoutpods="" timing="3.5260000000000002" parsetiming="1.846" parsetimedout="false" recalculate="" id="MSP17551hg8a868cf7g58dg0000496gd47e9hc2d496" host="https://www4b.wolframalpha.com" server="13" related="https://www4b.wolframalpha.com/api/v1/relatedQueries.jsp?id=MSPa17561hg8a868cf7g58dg000045308ed007hdbgee5438964653178483705" version="2.6" inputstring="solve y'(t) - 3y(t) = delta(t - 2), where y(0) = 0">
 <pod title="Input" scanner="Identity" id="Input" position="100" error="false" numsubpods="1"><h2> Input </h2>
  <subpod title="">
   <img src="https://www4b.wolframalpha.com/Calculate/MSP/MSP17571hg8a868cf7g58dg000011a4c3eba79fed44?MSPStoreType=image/gif&amp;s=13" alt="{y'(t) - 3 y(t) = δ(t - 2), y(0) = 0}" title="{y'(t) - 3 y(t) = δ(t - 2), y(0) = 0}" width="225" height="22" type="Default" themes="1,2,3,4,5,6,7,8,9,10,11,12" colorinvertable="true">
   <pre>{y'(t) - 3 y(t) = δ(t - 2), y(0) = 0}</pre>
  </subpod>
  <expressiontypes count="1">
   <expressiontype name="Default">
  </expressiontype></expressiontypes>
  <divs count="1">
   <div text="δ(x) is the Dirac delta function">
    <img src="https://www4b.wolframalpha.com/Calculate/MSP/MSP17581hg8a868cf7g58dg0000341c0b3971gci204?MSPStoreType=image/gif&amp;s=13" alt="δ(x) is the Dirac delta function" title="δ(x) is the Dirac delta function" width="199" height="19">
    <link url="http://reference.wolfram.com/language/ref/DiracDelta.html" text="Documentation" title="Mathematica">
    <link url="http://functions.wolfram.com/GeneralizedFunctions/DiracDelta" text="Properties" title="Wolfram Functions Site">
    <link url="http://mathworld.wolfram.com/DeltaFunction.html" text="Definition" title="MathWorld">
   </div>
  </divs>
 </pod>
 <pod title="ODE classification" scanner="ODE" id="ODEClassification" position="200" error="false" numsubpods="1"><h2> ODE classification </h2>
  <subpod title="">
   <img src="https://www4b.wolframalpha.com/Calculate/MSP/MSP17591hg8a868cf7g58dg00004a36ed5a74h2e84a?MSPStoreType=image/gif&amp;s=13" alt="first-order linear ordinary differential equation" title="first-order linear ordinary differential equation" width="307" height="19" type="Default" themes="1,2,3,4,5,6,7,8,9,10,11,12" colorinvertable="true">
   <pre>first-order linear ordinary differential equation</pre>
  </subpod>
  <expressiontypes count="1">
   <expressiontype name="Default">
  </expressiontype></expressiontypes>
 </pod>
 <pod title="Differential equation solutions" scanner="ODE" id="Solution" position="300" error="false" numsubpods="2" primary="true"><h2> Differential equation solutions </h2>
  <subpod title="">
   <img src="https://www4b.wolframalpha.com/Calculate/MSP/MSP17601hg8a868cf7g58dg00004cga50adhi4431ae?MSPStoreType=image/gif&amp;s=13" alt="y(t) = e^(3 t - 6) θ(t - 2)" title="y(t) = e^(3 t - 6) θ(t - 2)" width="130" height="21" type="Default" themes="1,2,3,4,5,6,7,8,9,10,11,12" colorinvertable="true">
   <pre>y(t) = e^(3 t - 6) θ(t - 2)</pre>
  </subpod>
  <subpod title="Possible intermediate steps"><details><summary> <b> Step-by-step Solution </b> </summary> 
   <img src="https://www4b.wolframalpha.com/Calculate/MSP/MSP17611hg8a868cf7g58dg00001c370d44ab4eeig9?MSPStoreType=image/gif&amp;s=13" alt="Solve ( dy(t))/( dt) - 3 y(t) = δ(t - 2):
Apply the Laplace transformation ℒ_t[f(t)](s) = integral_0^∞ f(t) e^(-s t) dt to both sides:
ℒ_t[( dy(t))/( dt) - 3 y(t)](s) = ℒ_t[δ(t - 2)](s)
Find the Laplace transformation term by term and factor out constants:
ℒ_t[( dy(t))/( dt)](s) - 3 (ℒ_t[y(t)](s)) = ℒ_t[δ(t - 2)](s)
Apply ℒ_t[( dy(t))/( dt)](s) = s (ℒ_t[y(t)](s)) - y(0):
s (ℒ_t[y(t)](s)) - y(0) - 3 (ℒ_t[y(t)](s)) = ℒ_t[δ(t - 2)](s)
Apply ℒ_t[δ(t - 2)](s) = e^(-2 s):
-3 (ℒ_t[y(t)](s)) + s (ℒ_t[y(t)](s)) - y(0) = e^(-2 s)
Substitute y(0) = 0:
-0 - 3 (ℒ_t[y(t)](s)) + s (ℒ_t[y(t)](s)) = e^(-2 s)
Simplify:
(s - 3) (ℒ_t[y(t)](s)) = e^(-2 s)
Solve for ℒ_t[y(t)](s):
ℒ_t[y(t)](s) = e^(-2 s)/(s - 3)
Compute y(t) = ℒ_s^(-1)[e^(-2 s)/(s - 3)](t):
Apply ℒ_s^(-1)[e^(-2 s)/(s - 3)](t) = e^(3 t - 6) θ(t - 2):
Answer: | 
 | y(t) = e^(3 t - 6) θ(t - 2)" title="Solve ( dy(t))/( dt) - 3 y(t) = δ(t - 2):
Apply the Laplace transformation ℒ_t[f(t)](s) = integral_0^∞ f(t) e^(-s t) dt to both sides:
ℒ_t[( dy(t))/( dt) - 3 y(t)](s) = ℒ_t[δ(t - 2)](s)
Find the Laplace transformation term by term and factor out constants:
ℒ_t[( dy(t))/( dt)](s) - 3 (ℒ_t[y(t)](s)) = ℒ_t[δ(t - 2)](s)
Apply ℒ_t[( dy(t))/( dt)](s) = s (ℒ_t[y(t)](s)) - y(0):
s (ℒ_t[y(t)](s)) - y(0) - 3 (ℒ_t[y(t)](s)) = ℒ_t[δ(t - 2)](s)
Apply ℒ_t[δ(t - 2)](s) = e^(-2 s):
-3 (ℒ_t[y(t)](s)) + s (ℒ_t[y(t)](s)) - y(0) = e^(-2 s)
Substitute y(0) = 0:
-0 - 3 (ℒ_t[y(t)](s)) + s (ℒ_t[y(t)](s)) = e^(-2 s)
Simplify:
(s - 3) (ℒ_t[y(t)](s)) = e^(-2 s)
Solve for ℒ_t[y(t)](s):
ℒ_t[y(t)](s) = e^(-2 s)/(s - 3)
Compute y(t) = ℒ_s^(-1)[e^(-2 s)/(s - 3)](t):
Apply ℒ_s^(-1)[e^(-2 s)/(s - 3)](t) = e^(3 t - 6) θ(t - 2):
Answer: | 
 | y(t) = e^(3 t - 6) θ(t - 2)" width="510" height="917" type="Default" themes="1,2,3,4,5,6,7,8,9,10,11,12" colorinvertable="true">
   <pre>Solve ( dy(t))/( dt) - 3 y(t) = δ(t - 2):
Apply the Laplace transformation ℒ_t[f(t)](s) = integral_0^∞ f(t) e^(-s t) dt to both sides:
ℒ_t[( dy(t))/( dt) - 3 y(t)](s) = ℒ_t[δ(t - 2)](s)
Find the Laplace transformation term by term and factor out constants:
ℒ_t[( dy(t))/( dt)](s) - 3 (ℒ_t[y(t)](s)) = ℒ_t[δ(t - 2)](s)
Apply ℒ_t[( dy(t))/( dt)](s) = s (ℒ_t[y(t)](s)) - y(0):
s (ℒ_t[y(t)](s)) - y(0) - 3 (ℒ_t[y(t)](s)) = ℒ_t[δ(t - 2)](s)
Apply ℒ_t[δ(t - 2)](s) = e^(-2 s):
-3 (ℒ_t[y(t)](s)) + s (ℒ_t[y(t)](s)) - y(0) = e^(-2 s)
Substitute y(0) = 0:
-0 - 3 (ℒ_t[y(t)](s)) + s (ℒ_t[y(t)](s)) = e^(-2 s)
Simplify:
(s - 3) (ℒ_t[y(t)](s)) = e^(-2 s)
Solve for ℒ_t[y(t)](s):
ℒ_t[y(t)](s) = e^(-2 s)/(s - 3)
Compute y(t) = ℒ_s^(-1)[e^(-2 s)/(s - 3)](t):
Apply ℒ_s^(-1)[e^(-2 s)/(s - 3)](t) = e^(3 t - 6) θ(t - 2):
Answer: | 
 | y(t) = e^(3 t - 6) θ(t - 2)</pre>
   <divs count="3">
    <div text="θ(x) is the Heaviside step function">
     <img src="https://www4b.wolframalpha.com/Calculate/MSP/MSP17621hg8a868cf7g58dg0000335cgbdhb973a3e7?MSPStoreType=image/gif&amp;s=13" alt="θ(x) is the Heaviside step function" title="θ(x) is the Heaviside step function" width="220" height="19">
     <link url="http://reference.wolfram.com/language/ref/HeavisideTheta.html" text="Documentation" title="Mathematica">
     <link url="http://functions.wolfram.com/GeneralizedFunctions/UnitStep" text="Properties" title="Wolfram Functions Site">
     <link url="http://mathworld.wolfram.com/HeavisideStepFunction.html" text="Definition" title="MathWorld">
    </div>
    <div text="ℒ_s^(-1)[f(s)](t) is the inverse Laplace transform of f(s) with positive real variable t">
     <img src="https://www4b.wolframalpha.com/Calculate/MSP/MSP17631hg8a868cf7g58dg000066ea259792ee5i9c?MSPStoreType=image/gif&amp;s=13" alt="ℒ_s^(-1)[f(s)](t) is the inverse Laplace transform of f(s) with positive real variable t" title="ℒ_s^(-1)[f(s)](t) is the inverse Laplace transform of f(s) with positive real variable t" width="312" height="47">
     <link url="http://reference.wolfram.com/language/ref/InverseLaplaceTransform.html" text="Documentation" title="Mathematica">
    </div>
    <div text="θ(x) is the Heaviside step function">
     <img src="https://www4b.wolframalpha.com/Calculate/MSP/MSP17641hg8a868cf7g58dg000021iaeh48hfbgg42h?MSPStoreType=image/gif&amp;s=13" alt="θ(x) is the Heaviside step function" title="θ(x) is the Heaviside step function" width="220" height="19">
     <link url="http://reference.wolfram.com/language/ref/UnitStep.html" text="Documentation" title="Mathematica">
     <link url="http://functions.wolfram.com/GeneralizedFunctions/UnitStep" text="Properties" title="Wolfram Functions Site">
     <link url="http://mathworld.wolfram.com/HeavisideStepFunction.html" text="Definition" title="MathWorld">
    </div>
   </divs>
   </details></subpod>
  <expressiontypes count="2">
   <expressiontype name="Default">
   <expressiontype name="Default">
  </expressiontype></expressiontype></expressiontypes>
  <p count="2">
   
   
  </p>
 </pod>
 <pod title="Plots of the solution" scanner="ODE" id="PlotsOfTheSolution" position="400" error="false" numsubpods="1"><h2> Plots of the solution </h2>
  <subpod title="">
   <img src="https://www4b.wolframalpha.com/Calculate/MSP/MSP17651hg8a868cf7g58dg00005d9h4f94aiaee6dc?MSPStoreType=image/gif&amp;s=13" alt=" | | | | " title=" | | | | " width="332" height="100" type="Default" themes="1,2,3,4,5,6,7,8,9,10,11,12" colorinvertable="true">
   <pre> | | | | </pre>
  </subpod>
  <expressiontypes count="1">
   <expressiontype name="Default">
  </expressiontype></expressiontypes>
 </pod>
</queryresult>
<div>
${htmlStyles}`;

const htmlStyles = `
  <style>
    * {
      font-family: -apple-system, Roboto;
      padding: 0 2px;
      margin-top: 10px;
      font-size: 30px;
      background-color: green;
    }
    img {
      width: 100%;
    }
    ul, ol {
      padding: 0 20px;
    }
    #Root {
      padding: 30px 0;
      background-color: red;
      hr {
        margin: 20px 0px;
      }
    
      h1 {
        font-weight: bold;
        font-size: 34px;
      }
    
      h2,
      h3,
      h4 {
        font-weight: 500;
      }
    
      h2 {
        font-weight: 500;
        font-size: 30px;
      }
    
      ul,
      ol {
        margin-bottom: 2em;
        color: #272727;
    
        li {
          line-height: 32px;
          margin-top: 1em;
          font-size: 21px;
          margin-left: 30px;
          list-style-type: disc;
          margin-bottom: -0.46em;
        }
      }
    
      ol {
        li {
          list-style-type: decimal;
        }
      }
    
      p {
        margin: 0 0 38px 0;
        font-weight: 400;
        font-size: 20px;
        line-height: 32px;
        color: #272727;
      }
    
      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
    
        &.cover {
          width: calc(100% + 40px);
          margin-left: -20px;
          max-width: unset;
        }
      }
    
      figure {
        padding: 50px 0px !important;
      }
    
      figcaption {
        text-align: center !important;
        font-family: 'Lora', serif !important;
        font-weight: 400 !important;
        color: rgba(117, 117, 117, 1) !important;
        font-size: 14px !important;
        margin-top: 0px !important;
        line-height: 28px !important;
      }
    
      blockquote {
        padding-left: 30px;
      }
    
      strong {
        color: black;
      }
    
      p,
      h1,
      h2,
      h3,
      span {
        overflow-wrap: break-word;
      }
    }
  </style>
`;

export default function ModalScreen({ route, navigation }) {
  const { urlEncodedInput } = route.params;
  console.log("Input", urlEncodedInput);
  const WOLFRAMALPHA_URL =
    "https://www.wolframalpha.com/input/?i=" + urlEncodedInput;

  return (
    <SolutionContainer>
      <StatusBar hidden />
      <ScrollView showsVerticalScrollIndicator={false}>
        <DismissContainer onPress={() => navigation.goBack()}>
          <CloseView>
            <Ionicons
              name="ios-close"
              size={32}
              style={{ marginLeft: 10, marginTop: 0 }}
            />
          </CloseView>
        </DismissContainer>
        {/* <WebView
        source={{ uri: WOLFRAMALPHA_URL }}
        style={{ marginTop: 70, flex: 1, width: "100%" }}
      /> */}
        <MathJax
          // HTML content with MathJax support
          html={content}
          // MathJax config option
          // mathJaxOptions={{
          //   messageStyle: 'none',
          //   extensions: [ 'tex2jax.js' ],
          //   jax: [ 'input/TeX', 'output/HTML-CSS' ],
          //   tex2jax: {
          //     inlineMath: [ ['$','$'], ['\\(','\\)'] ],
          //     displayMath: [ ['$$','$$'], ['\\[','\\]'] ],
          //     processEscapes: true,
          //   },
          //   TeX: {
          //     extensions: ['AMSmath.js','AMSsymbols.js','noErrors.js','noUndefined.js']
          //   }
          // }}
          scalesPageToFit={true}
          style={{ marginTop: 50 }}
        />
      </ScrollView>
    </SolutionContainer>
  );
}

const SolutionContainer = styled.View`
  flex: 1;
`;

const DismissContainer = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10000;
`;

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
`;
