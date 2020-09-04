import {Box} from "../src/Box.js";

describe( "Box", () => {

	it( ".one()", () => {

		class TestClass {}

		class BoxExt extends Box {
			newTest() {
				return new TestClass();
			}
			oneTest() {
				return this.one( this.newTest );
			}
		}

		const oBox = new BoxExt();
		let oTest1 = oBox.oneTest();
		let oTest2 = oBox.oneTest();
		expect( oTest1 === oTest2 ).toEqual(true );
	} );

	it( ".bind()", () => {

		class TestClass {
			sNeedProp
		}

		class BoxExt extends Box {
			newTest( sNeedProp ) {
				const oObj = new TestClass();
				oObj.sNeedProp = sNeedProp;
				return oObj;
			}
		}

		const oBox = new BoxExt();
		let oTest = oBox.newTest( '135' );
		expect( oTest.sNeedProp ).toEqual('135' );
	} );

	it( "._initCheck()", () => {
		const oBox = new Box();
		class TestClass {
			sPublicProp;
			_sPrivateProp;
		}

		const oTest = new TestClass();
		try {
			oBox._initCheck( oTest );
			fail();
		} catch( e ) {}

		oTest.sPublicProp = null;

		try {
			oBox._initCheck( oTest );
		} catch( e ) {
			fail();
		}
	} );
} );