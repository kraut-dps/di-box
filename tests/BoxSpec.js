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

		oBox.reset();
		let oTest3 = oBox.oneTest();
		expect( oTest1 === oTest3 ).toEqual(false );
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

	it( ".initCheck()", () => {
		const oBox = new Box();
		class TestClass {
			sPublicProp;
			_sPrivateProp;
		}

		const oTest = new TestClass();
		try {
			oBox.initCheck( oTest );
			fail();
		} catch( e ) {}

		oTest.sPublicProp = null;

		try {
			oBox.initCheck( oTest );
		} catch( e ) {
			fail();
		}
	} );

	it( ".skipCheck()", () => {
		class TestClass {
			sNeedProp;
		}

		// допустим надо делать initCheck методам с префиксом build
		class BoxExt extends Box {
			newTest() {
				const oObj = new TestClass();
				this.skipCheck();
				return oObj;
			}
		}

		let oBox = new BoxExt();
		try {
			oBox.newTest();
			// потому что проверки не будет
		} catch( e ) {
			fail()
		}
	} );

	it( "new prefix", () => {
		class TestClass {
			sNeedProp;
		}

		// допустим надо делать initCheck методам с префиксом build
		class BoxExt extends Box {
			buildTest() {
				const oObj = new TestClass();
				return oObj;
			}
		}

		let oBox = new BoxExt( 'new' );
		try {
			oBox.buildTest();
		} catch( e ) {
			fail()
		}

		oBox = new BoxExt( 'build' );
		try {
			oBox.buildTest();
			fail();
		} catch( e ) {}
	} );

	it( "protected prefix", () => {
		class TestClass {
			protectedProp;
		}

		class BoxExt extends Box {
			newTest() {
				const oObj = new TestClass();
				return oObj;
			}
		}

		let oBox = new BoxExt( 'new', '_' );
		try {
			oBox.newTest();
			fail()
		} catch( e ) {
			// потому что protectedProp будет считать свойством с undefined
		}

		oBox = new BoxExt( 'new', 'protected' );
		try {
			oBox.newTest();
			// потому что protectedProp будет считатся protected, и пропустится
		} catch( e ) {
			fail();
		}
	} );

	it( "self check", () => {
		class TestClass {}

		class BoxExt extends Box {
			TestClass;
			newTest() {
				return new this.TestClass();
			}
		}

		let oBox = new BoxExt();
		try {
			oBox.newTest();
			fail()
		} catch( e ) {
			// self check
		}

		oBox.TestClass = TestClass;
		try {
			oBox.newTest();
			// self check
		} catch( e ) {
			fail();
		}

		oBox.newTest();

	} );
} );