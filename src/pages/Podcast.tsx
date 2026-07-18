import React, { useEffect, useMemo } from 'react';
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
import { useTranslation } from 'react-i18next';
import { trackPageView } from '../utils/analytics';

type PodcastPlatform = { name: string; icon: string };

type PodcastEpisode = {
  number: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  topics: string[];
  guest: string | null;
  featured?: boolean;
};

const PLATFORM_LINKS = ['#', '#', '#', '#'];

const Podcast: React.FC = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    trackPageView('podcast');
    window.scrollTo(0, 0);
  }, []);

  const episodes = useMemo(() => {
    const items = t('pages.podcast.episodes', { returnObjects: true });
    return Array.isArray(items) ? (items as PodcastEpisode[]) : [];
  }, [t, i18n.language]);

  const platforms = useMemo(() => {
    const items = t('pages.podcast.platforms', { returnObjects: true });
    return Array.isArray(items) ? (items as PodcastPlatform[]) : [];
  }, [t, i18n.language]);

  const aboutPoints = useMemo(() => {
    const items = t('pages.podcast.aboutPoints', { returnObjects: true });
    return Array.isArray(items) ? (items as string[]) : [];
  }, [t, i18n.language]);

  return (
    <Container className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <Mic size={60} className="text-primary mb-3" />
          <h1 className="display-4 fw-bold mb-3">{t('pages.podcast.title')}</h1>
          <p className="lead text-muted mb-4">{t('pages.podcast.subtitle')}</p>
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <Badge bg="primary">{t('pages.podcast.badgeEpisodes')}</Badge>
            <Badge bg="success">{t('pages.podcast.badgeBiweekly')}</Badge>
            <Badge bg="info">{t('pages.podcast.badgeFree')}</Badge>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Card className="border-0 shadow-sm bg-light">
            <Card.Body className="text-center p-4">
              <h5 className="mb-3">
                <Headphones className="me-2" />
                {t('pages.podcast.listenOn')}
              </h5>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {platforms.map((platform, index) => (
                  <Button
                    key={platform.name}
                    variant="outline-dark"
                    size="lg"
                    href={PLATFORM_LINKS[index] ?? '#'}
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

      {episodes.filter((ep) => ep.featured).map((episode) => (
        <Row key={episode.number} className="mb-5">
          <Col>
            <Card className="border-primary shadow-lg">
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <Badge bg="danger" className="px-3 py-2">
                    <Star className="me-1" />
                    {t('pages.podcast.featured')}
                  </Badge>
                  <Badge bg="primary">
                    {t('pages.podcast.episodeLabel', { n: episode.number })}
                  </Badge>
                </div>

                <h2 className="mb-3">{episode.title}</h2>
                <p className="lead text-muted mb-4">{episode.description}</p>

                <Row className="mb-4">
                  <Col md={4} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <Clock className="text-primary me-2" />
                      <div>
                        <small className="text-muted d-block">{t('pages.podcast.duration')}</small>
                        <strong>{episode.duration}</strong>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-center">
                      <Calendar className="text-primary me-2" />
                      <div>
                        <small className="text-muted d-block">{t('pages.podcast.published')}</small>
                        <strong>{episode.date}</strong>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    {episode.guest && (
                      <div className="d-flex align-items-center">
                        <ChatDots className="text-primary me-2" />
                        <div>
                          <small className="text-muted d-block">{t('pages.podcast.guest')}</small>
                          <strong className="small">{episode.guest}</strong>
                        </div>
                      </div>
                    )}
                  </Col>
                </Row>

                <div className="mb-4">
                  <small className="text-muted d-block mb-2">{t('pages.podcast.topics')}</small>
                  <div className="d-flex flex-wrap gap-2">
                    {episode.topics.map((topic) => (
                      <Badge key={topic} bg="light" text="dark">{topic}</Badge>
                    ))}
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <Button variant="primary" size="lg">
                    <PlayCircle className="me-2" />
                    {t('pages.podcast.listenNow')}
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    <Download className="me-2" />
                    {t('pages.podcast.download')}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}

      <Row>
        <Col>
          <h2 className="mb-4">{t('pages.podcast.allEpisodes')}</h2>

          <ListGroup>
            {episodes.filter((ep) => !ep.featured).map((episode) => (
              <ListGroup.Item key={episode.number} className="border-0 shadow-sm mb-3">
                <Row className="align-items-center">
                  <Col md={8} className="mb-3 mb-md-0">
                    <div className="d-flex align-items-start">
                      <div
                        className="bg-primary text-white rounded me-3 d-flex align-items-center justify-content-center"
                        style={{ width: '50px', height: '50px', flexShrink: 0 }}
                      >
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
                          {episode.topics.map((topic) => (
                            <Badge key={topic} bg="light" text="secondary" className="me-1 small">
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
                        {t('pages.podcast.play')}
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

      <Row className="mt-5">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm bg-light">
            <Card.Body className="p-4 p-md-5">
              <h3 className="mb-4">{t('pages.podcast.aboutTitle')}</h3>
              <p className="mb-3">{t('pages.podcast.aboutIntro')}</p>
              <ListGroup variant="flush" className="mb-4">
                {aboutPoints.map((point) => (
                  <ListGroup.Item key={point} className="border-0 bg-transparent">
                    <CheckCircle className="text-success me-2" />
                    {point}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <p className="text-muted mb-0">{t('pages.podcast.aboutOutro')}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="border-success shadow-lg text-center">
            <Card.Body className="p-5">
              <Mic size={48} className="text-success mb-3" />
              <h3 className="mb-3">{t('pages.podcast.ctaTitle')}</h3>
              <p className="lead text-muted mb-4">{t('pages.podcast.ctaBody')}</p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Button variant="success" size="lg" href="mailto:podcast@vipshipping.com">
                  <ChatDots className="me-2" />
                  {t('pages.podcast.emailUs')}
                </Button>
                <Button variant="outline-success" size="lg" href="/contact">
                  {t('pages.podcast.contactForm')}
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
