import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, ListGroup } from 'react-bootstrap';
import { 
  Mic, 
  PlayCircle, 
  Clock, 
  Calendar,
  Star,
  Headphones,
  Download,
  ChatDots,
  CheckCircle
} from 'react-bootstrap-icons';
import { trackPageView } from '../utils/analytics';

const Podcast: React.FC = () => {
  useEffect(() => {
    trackPageView('podcast');
    window.scrollTo(0, 0);
  }, []);

  const episodes = [
    {
      number: 12,
      title: 'International Moving 101: Everything You Need to Know',
      description: 'A comprehensive guide to planning your first international move, including customs, documentation, and choosing the right shipping method.',
      duration: '45 min',
      date: 'Feb 15, 2025',
      topics: ['International Moving', 'Customs', 'Documentation', 'Shipping Methods'],
      guest: 'Sarah Chen, Customs Broker',
      featured: true
    },
    {
      number: 11,
      title: 'Packing Tips from Professional Movers',
      description: 'Learn the secrets professional movers use to pack efficiently and protect your belongings during transit.',
      duration: '32 min',
      date: 'Feb 1, 2025',
      topics: ['Packing', 'Tips & Tricks', 'Organization'],
      guest: 'Mike Rodriguez, Lead Packer'
    },
    {
      number: 10,
      title: 'Moving with Kids: A Parent\'s Guide',
      description: 'Strategies to make moving less stressful for children of all ages, from toddlers to teenagers.',
      duration: '38 min',
      date: 'Jan 18, 2025',
      topics: ['Family Moving', 'Kids', 'Mental Health'],
      guest: 'Dr. Emily Johnson, Child Psychologist'
    },
    {
      number: 9,
      title: 'Cost-Saving Strategies for Your Move',
      description: 'Expert tips on how to reduce moving costs without sacrificing quality or service.',
      duration: '29 min',
      date: 'Jan 4, 2025',
      topics: ['Budget', 'Money Saving', 'Planning'],
      guest: null
    },
    {
      number: 8,
      title: 'Pet Relocation: Moving with Furry Friends',
      description: 'Everything you need to know about moving with pets internationally, including health certificates and quarantine requirements.',
      duration: '41 min',
      date: 'Dec 21, 2024',
      topics: ['Pet Moving', 'International', 'Documentation'],
      guest: 'Dr. Amanda Lee, Veterinarian'
    },
    {
      number: 7,
      title: 'Downsizing Before a Move',
      description: 'How to declutter effectively and decide what to keep, sell, donate, or discard before your move.',
      duration: '35 min',
      date: 'Dec 7, 2024',
      topics: ['Downsizing', 'Organization', 'Minimalism'],
      guest: 'Marie Thompson, Professional Organizer'
    },
    {
      number: 6,
      title: 'Understanding Moving Insurance',
      description: 'A deep dive into different types of moving insurance and how to choose the right protection for your belongings.',
      duration: '28 min',
      date: 'Nov 23, 2024',
      topics: ['Insurance', 'Protection', 'Claims'],
      guest: null
    },
    {
      number: 5,
      title: 'Moving to Europe: A Complete Guide',
      description: 'Specific considerations for relocating to European countries, including visa requirements and cultural adaptation.',
      duration: '52 min',
      date: 'Nov 9, 2024',
      topics: ['Europe', 'International', 'Visas', 'Culture'],
      guest: 'James Wilson, Expat Consultant'
    },
    {
      number: 4,
      title: 'How to Choose a Moving Company',
      description: 'Red flags to watch for, questions to ask, and how to verify a moving company\'s credentials.',
      duration: '31 min',
      date: 'Oct 26, 2024',
      topics: ['Choosing Movers', 'Scams', 'Research'],
      guest: null
    },
    {
      number: 3,
      title: 'Moving Timeline: When to Do What',
      description: 'A detailed timeline of tasks from 3 months before your move to settling into your new home.',
      duration: '27 min',
      date: 'Oct 12, 2024',
      topics: ['Planning', 'Timeline', 'Checklist'],
      guest: null
    },
    {
      number: 2,
      title: 'Special Items: Pianos, Art, and Antiques',
      description: 'How to properly move high-value and delicate items that require special handling and crating.',
      duration: '39 min',
      date: 'Sep 28, 2024',
      topics: ['Special Items', 'White Glove', 'Crating'],
      guest: 'David Miller, Fine Art Handler'
    },
    {
      number: 1,
      title: 'Welcome to Moving Made Easy',
      description: 'Introduction to our podcast and what you can expect from future episodes. Meet your hosts and learn about VIP International Shipping.',
      duration: '22 min',
      date: 'Sep 14, 2024',
      topics: ['Introduction', 'Welcome'],
      guest: null
    }
  ];

  const platforms = [
    { name: 'Apple Podcasts', icon: '🎧', link: '#' },
    { name: 'Spotify', icon: '🎵', link: '#' },
    { name: 'Google Podcasts', icon: '📻', link: '#' },
    { name: 'YouTube', icon: '▶️', link: '#' }
  ];

  return (
    <Container className="py-5">
      {/* Hero */}
      <Row className="text-center mb-5">
        <Col>
          <Mic size={60} className="text-primary mb-3" />
          <h1 className="display-4 fw-bold mb-3">Moving Made Easy Podcast</h1>
          <p className="lead text-muted mb-4">
            Expert advice, insider tips, and real stories from the world of international moving
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <Badge bg="primary">12 Episodes</Badge>
            <Badge bg="success">New Episodes Biweekly</Badge>
            <Badge bg="info">Free Listening</Badge>
          </div>
        </Col>
      </Row>

      {/* Listen On */}
      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm bg-light">
            <Card.Body className="text-center p-4">
              <h5 className="mb-3">
                <Headphones className="me-2" />
                Listen On Your Favorite Platform
              </h5>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {platforms.map((platform, index) => (
                  <Button
                    key={index}
                    variant="outline-dark"
                    size="lg"
                    href={platform.link}
                    className="d-flex align-items-center"
                  >
                    <span style={{ fontSize: '1.5rem' }} className="me-2">{platform.icon}</span>
                    {platform.name}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Featured Episode */}
      {episodes.filter(ep => ep.featured).map(episode => (
        <Row key={episode.number} className="mb-5">
          <Col>
            <Card className="border-primary shadow-lg">
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Badge bg="danger" className="px-3 py-2">
                    <Star className="me-1" />
                    Featured Episode
                  </Badge>
                  <Badge bg="primary">Episode {episode.number}</Badge>
                </div>
                
                <h2 className="mb-3">{episode.title}</h2>
                
                <p className="lead text-muted mb-4">{episode.description}</p>
                
                <Row className="mb-4">
                  <Col md={4} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <Clock className="text-primary me-2" />
                      <div>
                        <small className="text-muted d-block">Duration</small>
                        <strong>{episode.duration}</strong>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <Calendar className="text-primary me-2" />
                      <div>
                        <small className="text-muted d-block">Published</small>
                        <strong>{episode.date}</strong>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    {episode.guest && (
                      <div className="d-flex align-items-center">
                        <ChatDots className="text-primary me-2" />
                        <div>
                          <small className="text-muted d-block">Guest</small>
                          <strong className="small">{episode.guest}</strong>
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>

                <div className="mb-4">
                  <small className="text-muted d-block mb-2">Topics:</small>
                  <div className="d-flex flex-wrap gap-2">
                    {episode.topics.map((topic, idx) => (
                      <Badge key={idx} bg="light" text="dark">{topic}</Badge>
                    ))}
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <Button variant="primary" size="lg">
                    <PlayCircle className="me-2" />
                    Listen Now
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    <Download className="me-2" />
                    Download
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}

      {/* All Episodes */}
      <Row>
        <Col>
          <h2 className="mb-4">All Episodes</h2>
          
          <ListGroup>
            {episodes.filter(ep => !ep.featured).map(episode => (
              <ListGroup.Item key={episode.number} className="border-0 shadow-sm mb-3">
                <Row className="align-items-center">
                  <Col md={8} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-start">
                      <div className="bg-primary text-white rounded me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', flexShrink: 0 }}>
                        <strong>#{episode.number}</strong>
                      </div>
                      <div>
                        <h5 className="mb-2">{episode.title}</h5>
                        <p className="text-muted mb-2 small">{episode.description}</p>
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                          <Badge bg="light" text="dark">
                            <Clock size={12} className="me-1" />
                            {episode.duration}
                          </Badge>
                          <Badge bg="light" text="dark">
                            <Calendar size={12} className="me-1" />
                            {episode.date}
                          </Badge>
                          {episode.guest && (
                            <Badge bg="info" className="small">
                              <ChatDots size={12} className="me-1" />
                              {episode.guest}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2">
                          {episode.topics.map((topic, idx) => (
                            <Badge key={idx} bg="light" text="secondary" className="me-1 small">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="text-md-end">
                    <div className="d-flex gap-2 justify-content-md-end">
                      <Button variant="primary">
                        <PlayCircle className="me-1" />
                        Play
                      </Button>
                      <Button variant="outline-primary">
                        <Download />
                      </Button>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      {/* About */}
      <Row className="mt-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm bg-light">
            <Card.Body className="p-4 p-md-5">
              <h3 className="mb-4">About Moving Made Easy</h3>
              <p className="mb-3">
                <strong>Moving Made Easy</strong> is your go-to resource for everything related to moving, whether you're relocating across town or across the world. Hosted by VIP International Shipping's moving experts, each episode features:
              </p>
              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item className="border-0 bg-transparent">
                  <CheckCircle className="text-success me-2" />
                  Expert advice from industry professionals
                </ListGroup.Item>
                <ListGroup.Item className="border-0 bg-transparent">
                  <CheckCircle className="text-success me-2" />
                  Real stories from people who've successfully moved
                </ListGroup.Item>
                <ListGroup.Item className="border-0 bg-transparent">
                  <CheckCircle className="text-success me-2" />
                  Practical tips you can use for your own move
                </ListGroup.Item>
                <ListGroup.Item className="border-0 bg-transparent">
                  <CheckCircle className="text-success me-2" />
                  Answers to your most common moving questions
                </ListGroup.Item>
              </ListGroup>
              <p className="text-muted mb-0">
                New episodes are released every two weeks. Subscribe on your favorite platform to never miss an episode!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* CTA */}
      <Row className="mt-5">
        <Col>
          <Card className="border-success shadow-lg text-center">
            <Card.Body className="p-5">
              <Mic size={48} className="text-success mb-3" />
              <h3 className="mb-3">Have a Topic Suggestion?</h3>
              <p className="lead text-muted mb-4">
                We'd love to hear what you want to learn about! Send us your questions and topic ideas.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button variant="success" size="lg" href="mailto:podcast@vipshipping.com">
                  <ChatDots className="me-2" />
                  Email Us
                </Button>
                <Button variant="outline-success" size="lg" href="/contact">
                  Contact Form
                </Button>
    </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default Podcast;
