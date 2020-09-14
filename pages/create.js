import { Form, Input, TextArea, Button, Image, Message, Header, Icon} from 'semantic-ui-react';
import axios from 'axios';
import baseURL from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
}

function CreateProduct() {
  const [product, setProduct] = React.useState({
    name: "",
    price: "",
    media: "",
    description: ""
  });

  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const [mediaPreview, setMediaPreview] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");

  function handleChange(event) {
    const {name, value, files} = event.target;
    if(name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0]}));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    }
    else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  async function handleImageUpload() {
    // Request specific settings for Cloudinary
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'react-reserve');
    data.append('cloud_name', 'sahildeb');
    const res = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = res.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true); // Show Loader
      const mediaUrl = await handleImageUpload();
      const url = `${baseURL}/api/product`;
      const payload = {...product, mediaUrl};
      await axios.post(url, payload);
      setSuccess(true);
    }
    catch(err) {
      // Use SetError as callback
      catchErrors(err, setError);
    }
    finally {
      setLoading(false);
      setProduct(INITIAL_PRODUCT);
    }
  }

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        Create New Product
      </Header>
      <Form error={Boolean(error)} loading={loading} success={success} onSubmit={handleSubmit} >
        <Message success icon="check" header="Success!" content="Your product is hosted!" />
        <Message error header="Oops!" content={error} />
        <Form.Group widths="equal">
          <Form.Field control={Input} name="name" label="Name" placeholder="Name" onChange={handleChange} value={product.name} />
          <Form.Field control={Input} name="price" label="Price" placeholder="Price" type="number" min="0.00" step="0.01" onChange={handleChange} value={product.price} />
          <Form.Field control={Input} name="media" type="file" label="Media" content="Select Image" accept="image/*" onChange={handleChange} />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field control={TextArea} name="description" label="Description" placeholder="Description" onChange={handleChange} value={product.description} />
        <Form.Field disabled={loading || disabled} control={Button} color="blue" icon="pencil alternate"  content="Submit" type="submit" />
      </Form>
    </>
  );
}

export default CreateProduct;
