const productController = require("../../controller/products");
const productModel = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const newProduct = require("../data/new-product.json");
const Product = require("../../models/Product");
productModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

// 테스트할 그룹은 어떠한 그룹인지 명시
// create에 관련된 테스트들을 넣것다
describe("Product Controller Create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  // test() 이런식으로 써도 댐
  // 테스트가 어떤 테스트 케이스인지 작성
  it("should have a createProduct function", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
  it("should call ProductModel.create", () => {
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith();
  });

  it("should return 201 response code", () => {
    productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", () => {
    productModel.create.mockReturnValue(newProduct);
    productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject();
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
