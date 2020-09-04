import {RootBox} from "../src/RootBox.js";
import {Box} from "../src/Box.js";

describe( "RootBox", () => {

	it( "_Box", () => {

		const oRootBox = new RootBox( {
			testBox:{
				_Box: Box,
			}
		} );
		const oBox1 = oRootBox.box( 'testBox' );
		const oBox2 = oRootBox.box( 'testBox' );
		expect( oBox1 === oBox2 ).toEqual(true );
	} );

	it( "Class", () => {
		class TestClass1 {
			run() {
				return 1;
			}
		}
		class TestClass2 {
			run() {
				return 2;
			}
		}

		class BoxExt extends Box {
			TestClass;
			newTest() {
				return new this.TestClass();
			}
		}

		let oDeps = {
			testBox:{
				_Box: BoxExt,
				TestClass: TestClass1
			}
		};

		let oRootBox, oTest;

		oRootBox = new RootBox( oDeps );
		oTest = oRootBox.box( 'testBox' ).newTest();
		expect( oTest.run() ).toEqual(1 );

		oDeps.testBox.TestClass = TestClass2;
		oRootBox = new RootBox( oDeps );
		oTest = oRootBox.box( 'testBox' ).newTest();
		expect( oTest.run() ).toEqual(2 );
	} );

	it( "_fnRel", () => {
		class TestError extends Error {}
		class TestClass {
			newError;
			run() {
				throw this.newError();
			}
		}

		class BoxWithError extends Box {
			Error
			newError() {
				return new this.Error();
			}
		}
		class BoxWithTest extends Box {
			TestClass;
			newError;
			newTest() {
				const oObj = new this.TestClass();
				oObj.newError = this.newError;
				return oObj;
			}
		}

		let oDeps = {
			boxWithError: {
				_Box: BoxWithError,
				Error: TestError
			},
			boxWithTest: {
				_Box: BoxWithTest,
				TestClass: TestClass,
				_fnRel: ( oRoot, oBox ) => {
					oBox.newError = oRoot.box( 'boxWithError' ).newError;
				}
			}
		};

		let oRootBox, oTest;

		oRootBox = new RootBox( oDeps );
		oTest = oRootBox.box( 'boxWithTest' ).newTest();
		try{
			oTest.run();
			fail();
		} catch ( e ) {
			expect( e instanceof TestError ).toEqual(true );
		}
	} );

	it( "bad deps", () => {

		const oRootBox = new RootBox( {
			box: {}
		} );
		try{
			oRootBox.box( 'box' );
			fail();
		} catch ( e ) {
		}
	} );
} );